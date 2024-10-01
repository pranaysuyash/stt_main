from extensions import db
from models import SubscriptionTier
from app import app

def seed_subscription_tiers():
    with app.app_context():
        tiers = [
            SubscriptionTier(
                name='Free',
                price=0.0,
                features={"feature1": True, "feature2": False},
            ),
            SubscriptionTier(
                name='Pro',
                price=29.99,
                features={"feature1": True, "feature2": True, "feature3": False},
            ),
            SubscriptionTier(
                name='Enterprise',
                price=99.99,
                features={"feature1": True, "feature2": True, "feature3": True},
            ),
        ]
        for tier in tiers:
            existing_tier = SubscriptionTier.query.filter_by(name=tier.name).first()
            if not existing_tier:
                db.session.add(tier)
        db.session.commit()
        print("Subscription tiers seeded successfully.")

if __name__ == '__main__':
    seed_subscription_tiers()
