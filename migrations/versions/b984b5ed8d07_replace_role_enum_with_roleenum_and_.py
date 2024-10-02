"""Replace role_enum with roleenum and update ENUM type references

Revision ID: b984b5ed8d07
Revises: 14f9c60a42f7
Create Date: 2024-10-02 12:55:22.001302

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'b984b5ed8d07'
down_revision = '14f9c60a42f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### Step 1: Create new ENUM type 'roleenum' ###
    roleenum = postgresql.ENUM('ADMIN', 'USER', 'MANAGER', name='roleenum')
    roleenum.create(op.get_bind(), checkfirst=True)

    # ### Step 2: Alter 'roles.name' column to use 'roleenum' ###
    with op.batch_alter_table('roles') as batch_op:
        batch_op.alter_column(
            'name',
            type_=sa.Enum('ADMIN', 'USER', 'MANAGER', name='roleenum'),
            existing_type=postgresql.ENUM('ADMIN', 'USER', 'MANAGER', name='role_enum'),
            nullable=False,
            postgresql_using="name::text::roleenum"
        )

    # ### Step 3: Drop old ENUM type 'role_enum' ###
    role_enum = postgresql.ENUM('ADMIN', 'USER', 'MANAGER', name='role_enum')
    role_enum.drop(op.get_bind(), checkfirst=True)

    # ### end Alembic commands ###


def downgrade():
    # ### Step 1: Recreate old ENUM type 'role_enum' ###
    role_enum = postgresql.ENUM('ADMIN', 'USER', 'MANAGER', name='role_enum')
    role_enum.create(op.get_bind(), checkfirst=True)

    # ### Step 2: Revert 'roles.name' column to use 'role_enum' ###
    with op.batch_alter_table('roles') as batch_op:
        batch_op.alter_column(
            'name',
            type_=sa.Enum('ADMIN', 'USER', 'MANAGER', name='role_enum'),
            existing_type=postgresql.ENUM('ADMIN', 'USER', 'MANAGER', name='roleenum'),
            nullable=False,
            postgresql_using="name::text::role_enum"
        )

    # ### Step 3: Drop new ENUM type 'roleenum' ###
    roleenum = postgresql.ENUM('ADMIN', 'USER', 'MANAGER', name='roleenum')
    roleenum.drop(op.get_bind(), checkfirst=True)
