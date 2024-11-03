"""images_url

Revision ID: 9bfb09604473
Revises: 892d90ca37be
Create Date: 2024-11-02 23:02:50.448270

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "9bfb09604473"
down_revision: Union[str, None] = "892d90ca37be"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "apartments", sa.Column("images_url", sa.ARRAY(sa.String()), nullable=False)
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("apartments", "images_url")
    # ### end Alembic commands ###