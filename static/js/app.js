document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const audioPlayer = document.getElementById('audio-player');
    const videoPlayer = document.getElementById('video-player');
    const waveformContainer = document.getElementById('waveform-container');
    const progressContainer = document.getElementById('progress-container');
    const uploadProgress = document.getElementById('upload-progress');
    const progressText = document.getElementById('progress-text');
    const statusText = document.getElementById('status-text');
    const cancelUploadButton = document.getElementById('cancel-upload');
    const fileDashboard = document.getElementById('file-dashboard');
    const playerContainer = document.getElementById('player-container');
    const playPauseBtn = document.getElementById('play-pause');
    const prevFileBtn = document.getElementById('prev-file');
    const nextFileBtn = document.getElementById('next-file');
    const volumeControl = document.getElementById('volume');
    const playbackSpeedControl = document.getElementById('playback-speed');
    const loopToggle = document.getElementById('loop-toggle');
    const currentFileDisplay = document.getElementById('current-file-display');
    const currentFileName = document.getElementById('current-file-name');

    let uploadQueue = [];
    let currentWavesurfer = null;
    let currentFileIndex = -1;
    let files = [];
    let currentXhr = null;  // Track the current upload

    console.log('DOM Content Loaded. Setting up event listeners.');

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
        console.log('Drag over event - highlighting drop zone');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
        console.log('Drag leave event - unhighlighting drop zone');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        console.log('File dropped event');
        const droppedFiles = e.dataTransfer.files;
        console.log('Dropped files:', droppedFiles);
        handleFiles(droppedFiles);
    });

    fileInput.addEventListener('change', (e) => {
        console.log('File input change event');
        const selectedFiles = e.target.files;
        console.log('Selected files:', selectedFiles);
        handleFiles(selectedFiles);
    });

    dropZone.addEventListener('click', () => {
        console.log('Drop zone clicked');
        fileInput.click();
    });

    function handleFiles(fileList) {
        console.log('Handling files:', fileList);
        const maxFileSize = 200 * 1024 * 1024; // 200MB in bytes
        for (const file of fileList) {
            if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
                if (file.size <= maxFileSize) {
                    console.log('Valid file added to upload queue:', file.name);

                    // Show the preview for the selected file
                    document.getElementById('preview-section').style.display = 'block';
                    document.getElementById('selected-file-name').textContent = file.name;
                    document.getElementById('file-size').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
                    
                    const mediaElement = document.createElement(file.type.startsWith('audio/') ? 'audio' : 'video');
                    mediaElement.src = URL.createObjectURL(file);
                    mediaElement.addEventListener('loadedmetadata', function() {
                        const duration = mediaElement.duration;
                        document.getElementById('file-duration').textContent = duration
                            ? `${Math.floor(duration / 60)} min ${Math.floor(duration % 60)} sec`
                            : 'N/A';
                    });

                    uploadQueue.push(file);
                } else {
                    console.log('File too large, skipping:', file.name);
                    alert(`File ${file.name} is too large. Maximum file size is 200MB.`);
                }
            } else {
                console.log('Invalid file type, skipping:', file.name);
            }
        }
        if (uploadQueue.length > 0) {
            console.log('Starting upload process');
            uploadNextFile();
        } else {
            console.log('No valid files to upload');
        }
    }

    cancelUploadButton.addEventListener('click', function() {
        if (currentXhr) {
            currentXhr.abort();  // Abort the current upload
            console.log('Upload canceled');
            statusText.textContent = 'Upload canceled';
            progressContainer.style.display = 'none';
        }
    });

    function uploadNextFile() {
        if (uploadQueue.length === 0) {
            console.log('Upload queue empty, hiding progress container');
            progressContainer.style.display = 'none';
            return;
        }

        const file = uploadQueue.shift();
        console.log('Uploading next file:', file.name);
        uploadFile(file);
    }

    function uploadFile(file) {
        console.log('Uploading file:', file.name);
        currentXhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('file', file);

        progressContainer.style.display = 'block';
        uploadProgress.style.width = '0%';
        progressText.textContent = '0%';
        statusText.textContent = 'Uploading';

        currentXhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
                const percentComplete = (e.loaded / e.total) * 100;
                console.log('Upload progress:', percentComplete.toFixed(2) + '%');
                uploadProgress.style.width = percentComplete + '%';
                progressText.textContent = percentComplete.toFixed(2) + '%';
            }
        };

        currentXhr.onload = function() {
            console.log('Upload completed. Status:', currentXhr.status);
            if (currentXhr.status === 200) {
                const data = JSON.parse(currentXhr.responseText);
                console.log('Upload successful:', data);
                files.push({
                    filename: data.filename,
                    path: data.path,
                    type: file.type
                });
                updateFileDashboard();
                uploadNextFile();
            } else {
                console.error('Upload failed:', currentXhr.statusText);
                statusText.textContent = 'Upload failed';
                uploadNextFile();
            }
        };

        currentXhr.onerror = function() {
            console.error('Upload failed:', currentXhr.statusText);
            statusText.textContent = 'Upload failed';
            uploadNextFile();
        };

        currentXhr.open('POST', '/upload', true);
        currentXhr.send(formData);
    }

    function updateFileDashboard() {
        console.log('Updating file dashboard');
        fileDashboard.innerHTML = '';
        files.forEach((file, index) => {
            const fileCard = document.createElement('div');
            fileCard.className = 'file-card';
            fileCard.innerHTML = `
                <h3>${file.filename}</h3>
                <p>Type: ${file.type}</p>
                <button onclick="window.displayMedia(${index})">Play</button>
            `;
            fileDashboard.appendChild(fileCard);
        });
    }

    function createWaveform(filePath, mediaElement) {
        console.log('Creating waveform:', { filePath, mediaElement });
        if (currentWavesurfer) {
            currentWavesurfer.destroy();
        }

        currentWavesurfer = WaveSurfer.create({
            container: waveformContainer,
            waveColor: '#D9DCFF',
            progressColor: '#4353FF',
            cursorColor: '#4353FF',
            barWidth: 2,
            barRadius: 3,
            cursorWidth: 1,
            height: 128,
            barGap: 3,
            responsive: true,
            backend: 'WebAudio',
            mediaControls: false,
            interact: true,
            normalize: true,
            forceDecode: true
        });

        currentWavesurfer.load(mediaElement);

        currentWavesurfer.on('ready', function() {
            console.log('Wavesurfer is ready');
            playPauseBtn.onclick = function() {
                console.log('Play/Pause button clicked');
                currentWavesurfer.playPause();
                updatePlayPauseButton();
            };

            volumeControl.oninput = function() {
                currentWavesurfer.setVolume(this.value);
            };

            playbackSpeedControl.onchange = function() {
                mediaElement.playbackRate = this.value;
            };

            let isLooping = false;
            loopToggle.onclick = function() {
                isLooping = !isLooping;
                mediaElement.loop = isLooping;
                this.textContent = isLooping ? 'Unloop' : 'Loop';
            };

            currentWavesurfer.on('audioprocess', function() {
                if (isLooping && mediaElement.currentTime >= mediaElement.duration) {
                    mediaElement.currentTime = 0;
                    currentWavesurfer.seekTo(0);
                }
            });
        });

        currentWavesurfer.on('play', function() {
            console.log('Waveform play event');
            updatePlayPauseButton();
            mediaElement.play();
        });
        currentWavesurfer.on('pause', function() {
            console.log('Waveform pause event');
            updatePlayPauseButton();
            mediaElement.pause();
        });

        currentWavesurfer.on('seek', function(progress) {
            console.log('Seek event - Progress:', progress);
            if (!isNaN(progress) && isFinite(progress) && progress >= 0 && progress <= 1) {
                if (mediaElement.duration) {
                    mediaElement.currentTime = progress * mediaElement.duration;
                    console.log('Set currentTime:', mediaElement.currentTime);
                } else {
                    console.error('Media duration not available');
                }
            } else {
                console.error('Invalid progress value:', progress);
            }
        });

        mediaElement.addEventListener('loadedmetadata', () => {
            console.log('Media metadata loaded - Duration:', mediaElement.duration);
        });

        mediaElement.addEventListener('play', () => {
            console.log('Media element play event');
            currentWavesurfer.play();
        });
        mediaElement.addEventListener('pause', () => {
            console.log('Media element pause event');
            currentWavesurfer.pause();
        });
        mediaElement.addEventListener('seeked', () => {
            const progress = mediaElement.currentTime / mediaElement.duration;
            console.log('Seeked event - Progress:', progress);
            if (!isNaN(progress) && isFinite(progress) && progress >= 0 && progress <= 1) {
                currentWavesurfer.seekTo(progress);
            } else {
                console.error('Invalid progress value after seek:', progress);
            }
        });
    }

    function updatePlayPauseButton() {
        console.log('Updating play/pause button');
        const icon = playPauseBtn.querySelector('i');
        if (currentWavesurfer && currentWavesurfer.isPlaying()) {
            icon.className = 'fas fa-pause';
        } else {
            icon.className = 'fas fa-play';
        }
    }

    function displayMedia(index) {
        console.log('Displaying media:', index);
        currentFileIndex = index;
        const file = files[index];
        console.log('File:', file);

        if (!file) {
            console.error('No file found for index:', index);
            return;
        }

        const mediaElement = file.type.startsWith('audio') ? audioPlayer : videoPlayer;
        console.log('Media element:', mediaElement);

        audioPlayer.style.display = 'none';
        videoPlayer.style.display = 'none';
        
        mediaElement.style.display = 'block';
        mediaElement.src = file.path;
        
        createWaveform(file.path, mediaElement);
        playerContainer.style.display = 'block';
        
        currentFileName.textContent = file.filename;
        currentFileDisplay.style.display = 'block';
        
        updatePlayPauseButton();

        console.log('Starting playback');
        mediaElement.play().then(() => {
            console.log('Playback started successfully');
        }).catch(error => {
            console.error('Error starting playback:', error);
        });
    }

    prevFileBtn.addEventListener('click', () => {
        if (currentFileIndex > 0) {
            displayMedia(currentFileIndex - 1);
        }
    });

    nextFileBtn.addEventListener('click', () => {
        if (currentFileIndex < files.length - 1) {
            displayMedia(currentFileIndex + 1);
        }
    });

    window.displayMedia = displayMedia;
});
