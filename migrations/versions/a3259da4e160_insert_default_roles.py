"""Insert default roles

Revision ID: a3259da4e160
Revises: 70235c25a567
Create Date: 2024-09-30 23:00:06.780615

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import table, column
from sqlalchemy import String, Integer, Enum as SQLEnum
from models import RoleEnum

# revision identifiers, used by Alembic.
revision = 'a3259da4e160'
down_revision = '70235c25a567'
branch_labels = None
depends_on = None


def upgrade():
    # Create a table representation
    roles_table = table(
        'roles',
        column('id', Integer),
        column('name', SQLEnum(RoleEnum, name='role_enum')),
        column('description', String)
    )

    # Insert default roles
    op.bulk_insert(roles_table,
        [
            {'id': 1, 'name': RoleEnum.ADMIN.value, 'description': 'Administrator'},
            {'id': 2, 'name': RoleEnum.USER.value, 'description': 'Regular User'},
            {'id': 3, 'name': RoleEnum.MANAGER.value, 'description': 'Manager'},
        ]
    )

def downgrade():
    # Delete the inserted roles
    op.execute("DELETE FROM roles WHERE name IN ('ADMIN', 'USER', 'MANAGER');")
