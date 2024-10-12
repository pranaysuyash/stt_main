"""Rename files to media_files and fix relationships

Revision ID: 73712d1b8130
Revises: 90d87ba9bd47
Create Date: 2024-10-13 00:43:36.970841

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '73712d1b8130'
down_revision = '90d87ba9bd47'
branch_labels = None
depends_on = None


def upgrade():
    # Change column type with explicit casting
    op.execute(
        "ALTER TABLE analysis_results ALTER COLUMN media_file_id TYPE INTEGER USING media_file_id::integer"
    )

    op.execute(
        "ALTER TABLE processed_artifacts ALTER COLUMN media_file_id TYPE INTEGER USING media_file_id::integer"
    )

def downgrade():
    # Rollback column type change if needed
    op.execute(
        "ALTER TABLE analysis_results ALTER COLUMN media_file_id TYPE VARCHAR(36)"
    )

    op.execute(
        "ALTER TABLE processed_artifacts ALTER COLUMN media_file_id TYPE VARCHAR(36)"
    )