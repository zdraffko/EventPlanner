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
                values: new object[] { "e4acf16e-0afe-4c88-a15d-f29ddba3f1c9", 0, "288b0291-2144-4719-8a40-3d5db31b5b76", "testUser1@test.com", false, false, null, "TESTUSER1@TEST.COM", "TESTUSER1", "AQAAAAEAACcQAAAAEJWJ/llnpIVKdPwsH3FY6l/ia2p5+UfU0We70kNa07ShwQPT/joMOHrBSl6zydukTw==", null, false, "5fbe5051-da61-4720-9818-bdefc8c0aa6b", false, "testUser1" });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[] { "a2440bb9-4531-41b4-9b54-6b619ecb2771", 0, "8e068a83-0f73-4d92-9969-cc37f7071e7c", "testUser2@test.com", false, false, null, "TESTUSER2@TEST.COM", "TESTUSER2", "AQAAAAEAACcQAAAAEF9S2s5EothLLWEQahQzW8aVOD88HyLdC3qMcJBwB5Bp1C0fJ6U+QTc+1HXMAM9Jjg==", null, false, "74c1110a-3aa7-49ca-99c9-048fbec1003b", false, "testUser2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "a2440bb9-4531-41b4-9b54-6b619ecb2771");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "e4acf16e-0afe-4c88-a15d-f29ddba3f1c9");
        }
    }
}
