import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ValidationError = {
  path: string;
  message: string;
};

export function formatValidationErrorsToHTML(
  errors: ValidationError[],
): string {
  if (!errors || errors.length === 0) {
    return "";
  }

  const escapeHtml = (str: string) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const listItems = errors
    .map(
      (err) =>
        `<li><strong>${escapeHtml(err.path)}</strong>: ${escapeHtml(
          err.message,
        )}</li>`,
    )
    .join("");

  return `
    <div>
      <h4 style="margin:0 0 8px 0;">Validation Errors</h4>
      <ol style="margin:0; padding-left:20px;">
        ${listItems}
      </ol>
    </div>
  `.trim();
}
