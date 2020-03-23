using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedEventTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Category", "City", "Date", "Description", "Title", "Venue" },
                values: new object[,]
                {
                    { new Guid("0dc5a563-3e97-439f-a76c-85236c286c63"), "Tech", "Sofia", new DateTime(2020, 2, 23, 12, 22, 41, 342, DateTimeKind.Local).AddTicks(9914), "This Event was 1 month ago", "Past Event 1", "Sofia Tech Park" },
                    { new Guid("f1818f53-e294-4075-8c3a-d0f8313439a3"), "Tech", "Plovdiv", new DateTime(2020, 1, 23, 12, 22, 41, 345, DateTimeKind.Local).AddTicks(5233), "This Event was 2 months ago", "Past Event 2", "Mall Plovdiv" },
                    { new Guid("c0f13fa6-c746-410e-a570-8534e178e88f"), "Sports", "Sofia", new DateTime(2020, 4, 23, 12, 22, 41, 345, DateTimeKind.Local).AddTicks(5315), "This Event is 1 month in the future", "Future Event 1", "Armeets Arena" },
                    { new Guid("b1265fcf-3494-41df-8faf-f2afcd3958fa"), "Music", "Sofia", new DateTime(2020, 5, 23, 12, 22, 41, 345, DateTimeKind.Local).AddTicks(5322), "This Event is 2 months in the future", "Future Event 2", "Armeets Arena" },
                    { new Guid("923ddec3-2b27-4481-a4ef-6bfeb90d6520"), "Charity", "Plovdiv", new DateTime(2020, 6, 23, 12, 22, 41, 345, DateTimeKind.Local).AddTicks(5325), "This Event is 3 months in the future", "Future Event 3", "Glavnata" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: new Guid("0dc5a563-3e97-439f-a76c-85236c286c63"));

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: new Guid("923ddec3-2b27-4481-a4ef-6bfeb90d6520"));

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: new Guid("b1265fcf-3494-41df-8faf-f2afcd3958fa"));

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: new Guid("c0f13fa6-c746-410e-a570-8534e178e88f"));

            migrationBuilder.DeleteData(
                table: "Events",
                keyColumn: "Id",
                keyValue: new Guid("f1818f53-e294-4075-8c3a-d0f8313439a3"));
        }
    }
}
