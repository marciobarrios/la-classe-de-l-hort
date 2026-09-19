import { test, expect } from "@playwright/test";
const ci = (text: string) =>
  new RegExp("^" + text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$", "i");

test("explorar estacions, obrir una fitxa i tornar amb el teclat", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /què creix/i })).toBeVisible();
  await page
    .getByRole("button", { name: ci("Primavera"), exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: ci("Descobreix: Pèsols") }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: ci("Descobreix: Carbassa") }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: ci("Descobreix: Pèsols") }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Les llavors", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: ci("Descobreix: Pèsols") }),
  ).toBeFocused();
  await page.getByRole("button", { name: /tot l’hort/i }).click();
  await expect(page.getByRole("button", { name: /^Descobreix:/ })).toHaveCount(
    16,
  );
  const vegetableImages = page.locator('img[src^="/images/hortalisses/"]');
  await expect(vegetableImages).toHaveCount(16);
  for (let index = 0; index < 16; index += 1) {
    const image = vegetableImages.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element) => element.naturalWidth))
      .toBeGreaterThan(0);
  }
  await page.getByRole("button", { name: ci("Descobreix: Bleda") }).click();
  await expect(page.getByRole("dialog")).toContainText("Una descoberta més");
  await expect(page.getByRole("dialog")).toContainText(
    "penques blanques, grogues o vermelles",
  );
});

test("la preferència de lectura es conserva", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", {
    name: ci("Lletra de pal"),
    exact: true,
  });
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await page.reload();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByRole("heading", { name: /què creix/i })).toHaveCSS(
    "text-transform",
    "none",
  );
});

test("el recorregut arriba a la collita i es pot reiniciar", async ({
  page,
}) => {
  await page.goto("/#hortola");
  for (const action of [
    "Sembrem",
    "Reguem",
    "Cuidem",
    "Deixem passar els dies",
    "Collim",
    "Collim el rave",
  ]) {
    await page.getByRole("button", { name: ci(action), exact: true }).click();
  }
  await expect(
    page.getByRole("heading", { name: ci("Ja tenim una collita!") }),
  ).toBeVisible();
  await page.getByRole("button", { name: ci("Tornem a sembrar") }).click();
  await expect(
    page.getByRole("heading", { name: ci("Preparem la terra") }),
  ).toBeVisible();
});

test("el joc permet rectificar i acabar totes les descobertes", async ({
  page,
}) => {
  await page.goto("/#juguem");
  await page.getByRole("button", { name: ci("Enciam"), exact: true }).click();
  await expect(page.getByText(/Prova un altre aliment/)).toBeVisible();
  for (const [i, answer] of [
    "Pastanaga",
    "Enciam",
    "Pèsols",
    "Bròquil",
    "Ceba",
  ].entries()) {
    await page.getByRole("button", { name: ci(answer), exact: true }).click();
    await expect(page.getByText("Ho has descobert!")).toBeVisible();
    await page
      .getByRole("button", {
        name: ci(i === 4 ? "Hem acabat!" : "Una altra descoberta"),
        exact: true,
      })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: ci("Quantes coses hem descobert!") }),
  ).toBeVisible();
  await page.getByRole("button", { name: ci("Tornem a jugar") }).click();
  await expect(
    page.getByRole("heading", { name: ci("Quina arrel creix sota terra?") }),
  ).toBeVisible();
});

test("navegació, diàleg de famílies, imatges i amplada", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: ci("Fem d’hortolans"), exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: ci("Fem créixer un rave") }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: /què creix/i })).toBeVisible();
  await page
    .getByRole("button", { name: ci("Per a famílies i mestres"), exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: ci("De la pantalla a la terra") }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() =>
        Array.from(
          document.querySelectorAll<HTMLImageElement>(
            "img:not([loading='lazy'])",
          ),
        ).every((i) => i.complete && i.naturalWidth > 0),
      ),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: ci("Tanca"), exact: true }).click();
  expect(errors).toEqual([]);
});
