"""table Apartment

Revision ID: 892d90ca37be
Revises: 4fc8d02a0933
Create Date: 2024-09-23 01:12:40.255315

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "892d90ca37be"
down_revision: Union[str, None] = "4fc8d02a0933"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "apartments",
        sa.Column("link", sa.String(), nullable=False),
        sa.Column("city", sa.String(), nullable=False),
        sa.Column("district", sa.String(), nullable=False),
        sa.Column("price", sa.Float(), nullable=False),
        sa.Column("deposit", sa.Float(), nullable=True),
        sa.Column("standard", sa.String(), nullable=False),
        sa.Column("bedrooms", sa.String(), nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("date", sa.String(), nullable=False),
        sa.Column("area", sa.Float(), nullable=False),
        sa.Column("building_type", sa.String(), nullable=False),
        sa.Column("number_of_rooms", sa.String(), nullable=False),
        sa.Column("is_furnished", sa.Boolean(), nullable=False),
        sa.Column("is_private_offer", sa.Boolean(), nullable=False),
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("link"),
    )
    op.create_index(op.f("ix_apartments_id"), "apartments", ["id"], unique=True)
    # ### end Alembic commands ###

    op.execute(
        """
        CREATE OR REPLACE FUNCTION notify_apartment_insert() RETURNS TRIGGER AS $$
        BEGIN
            PERFORM pg_notify('apartments_channel', NEW.id::text);
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    """
    )

    op.execute(
        """
        CREATE TRIGGER apartment_insert_trigger
        AFTER INSERT ON apartments
        FOR EACH ROW EXECUTE FUNCTION notify_apartment_insert();
    """
    )


def downgrade() -> None:
    op.execute("DROP TRIGGER IF EXISTS apartment_insert_trigger ON apartments;")
    op.execute("DROP FUNCTION IF EXISTS notify_apartment_insert;")

    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_apartments_id"), table_name="apartments")
    op.drop_table("apartments")
    # ### end Alembic commands ###
