using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Identity.Migrations
{
    public partial class SeedUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "4561f674-8ce5-416b-b9d8-e2a889ba5ed1", 0, "63e99712-224d-4fd0-b6af-ebfbcf1fb41e", "testUser1@test.com", false, false, null, null, null, "AQAAAAEAACcQAAAAEM0E26O6C3hmnlUq761ykXGGyxGAR/SLjreo1DvxnKOI0qiPySj8xGiaE6rBbHXgXQ==", null, false, "ce80598e-1cc5-4b48-a76b-99421260fd7c", false, "testUser1" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "20ed9fe1-f130-4ff1-8553-d288ecc68c31", 0, "a8e0ab65-ed64-419c-89c4-ec3e5056b2df", "testUser2@test.com", false, false, null, null, null, "AQAAAAEAACcQAAAAEFtCt7QHar9TTvYwBvoXCXIOa8H8hjLWezQrTTi+RcMZ1TUCUc8yul9A8tvG00hkmQ==", null, false, "d11554ac-a29e-4abe-8026-7252a62cb9a3", false, "testUser2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "20ed9fe1-f130-4ff1-8553-d288ecc68c31");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4561f674-8ce5-416b-b9d8-e2a889ba5ed1");
        }
    }
}
