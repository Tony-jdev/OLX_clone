using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OLX_clone.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class SoldAtFieldAddedToPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "SoldAt",
                table: "Posts",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoldAt",
                table: "Posts");
        }
    }
}
