from playwright.sync_api import sync_playwright, expect

def verify_extended_features(page):
    base_url = "http://localhost:3000"

    # 1. Onboarding
    print("Verifying Onboarding...")
    page.goto(f"{base_url}/onboarding")
    expect(page.get_by_text("Personalize sua experiência")).to_be_visible()
    page.screenshot(path="verification/onboarding.png")

    # 2. Pricing
    print("Verifying Pricing...")
    page.goto(f"{base_url}/precos")
    expect(page.get_by_text("Escolha o plano ideal")).to_be_visible()
    page.screenshot(path="verification/pricing.png")

    # 3. Admin
    print("Verifying Admin...")
    page.goto(f"{base_url}/admin")
    expect(page.get_by_text("Painel de Curadoria")).to_be_visible()
    page.screenshot(path="verification/admin.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_extended_features(page)
        finally:
            browser.close()
