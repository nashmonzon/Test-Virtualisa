import { getLicenseStatus } from "../src/lib/utils";
import { LicenseType, Status } from "../src/types/enums";

describe("getLicenseStatus function", () => {
  test('should return "ALLOWED" status for personal license issued within 1 year', () => {
    const currentDate = new Date();
    const licenseIssued = new Date(currentDate);
    licenseIssued.setDate(currentDate.getDate() - 365); // Restar 364 días para que sea dentro de un año
    const licenseIssuedDate = licenseIssued.toISOString();

    const status = getLicenseStatus(licenseIssuedDate, LicenseType.PERSONAL);

    expect(status).toBe(Status.ALLOWED);
  });

  test('should return "PROHIBITED" status for personal license issued over 1 year', () => {
    const currentDate = new Date();
    const licenseIssued = new Date(currentDate);
    licenseIssued.setDate(currentDate.getDate() - 366);
    const licenseIssuedDate = licenseIssued.toISOString();

    const status = getLicenseStatus(licenseIssuedDate, LicenseType.PERSONAL);

    expect(status).toBe(Status.PROHIBITED);
  });

  test('should return "ALLOWED" status for professional license issued within 5 years', () => {
    const currentDate = new Date();
    const licenseIssued = new Date(currentDate);
    licenseIssued.setDate(currentDate.getDate() - 365 * 5);
    const licenseIssuedDate = licenseIssued.toISOString();

    const status = getLicenseStatus(
      licenseIssuedDate,
      LicenseType.PROFESSIONAL
    );

    expect(status).toBe(Status.ALLOWED);
  });

  test('should return "PROHIBITED" status for professional license issued over 5 years', () => {
    const currentDate = new Date();
    const licenseIssued = new Date(currentDate);
    licenseIssued.setDate(currentDate.getDate() - (365 * 5 + 1));
    const licenseIssuedDate = licenseIssued.toISOString();

    const status = getLicenseStatus(
      licenseIssuedDate,
      LicenseType.PROFESSIONAL
    );

    expect(status).toBe(Status.PROHIBITED);
  });
});
