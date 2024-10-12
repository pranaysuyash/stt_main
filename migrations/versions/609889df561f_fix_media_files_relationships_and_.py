"""Fix media_files relationships and indexes

Revision ID: 609889df561f
Revises: 73712d1b8130
Create Date: 2024-10-13 00:50:59.489052
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine import reflection

# revision identifiers, used by Alembic.
revision = '609889df561f'
down_revision = '73712d1b8130'
branch_labels = None
depends_on = None

def upgrade():
    # Check if 'media_file_id' column exists
    conn = op.get_bind()
    inspector = reflection.Inspector.from_engine(conn)
    columns = [col['name'] for col in inspector.get_columns('media_file_tags')]

    if 'media_file_id' not in columns:
        with op.batch_alter_table('media_file_tags') as batch_op:
            batch_op.add_column(sa.Column('media_file_id', sa.Integer(), nullable=False))
            batch_op.create_foreign_key(
                'media_file_tags_media_file_id_fkey',
                'media_files', ['media_file_id'], ['id'], ondelete='CASCADE'
            )

    # Alter 'media_files' table
    with op.batch_alter_table('media_files') as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('storage_path', sa.String(500), nullable=False))
        batch_op.add_column(sa.Column('file_size', sa.BigInteger(), nullable=False))
        batch_op.add_column(sa.Column('file_type', sa.String(50), nullable=False))
        batch_op.add_column(sa.Column('meta_data', sa.JSON(), nullable=True))
        batch_op.add_column(sa.Column('is_deleted', sa.Boolean(), nullable=True))
        batch_op.alter_column(
            'duration',
            type_=sa.Float(),
            existing_type=sa.VARCHAR(10),
            postgresql_using='duration::float'
        )

def downgrade():
    with op.batch_alter_table('media_files') as batch_op:
        batch_op.drop_column('is_deleted')
        batch_op.drop_column('meta_data')
        batch_op.drop_column('file_type')
        batch_op.drop_column('file_size')
        batch_op.drop_column('storage_path')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('media_file_tags') as batch_op:
        batch_op.drop_constraint('media_file_tags_media_file_id_fkey', type_='foreignkey')
        batch_op.drop_column('media_file_id')