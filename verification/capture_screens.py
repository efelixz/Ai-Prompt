from playwright.sync_api import sync_playwright
import time

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        base_url = "http://localhost:3000"

        pages = [
            ("/", "landing"),
            ("/explorar", "explore"),
            ("/prompt/arquitetura-eterea-hiper-realista", "detail"),
            ("/dashboard", "dashboard"),
            ("/studio", "studio"),
            ("/admin", "admin"),
            ("/marketplace", "marketplace"),
            ("/onboarding", "onboarding"),
            ("/precos", "pricing")
        ]

        for path, name in pages:
            try:
                print(f"Capturing {name}...")
                page.goto(f"{base_url}{path}", wait_until="networkidle")
                time.sleep(2) # Extra time for animations/gradients
                page.screenshot(path=f"verification/{name}.png", full_page=True)
            except Exception as e:
                print(f"Failed to capture {name}: {e}")

        browser.close()

if __name__ == "__main__":
    capture()
