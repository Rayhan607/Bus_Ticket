using Microsoft.EntityFrameworkCore.Migrations;

namespace BTMS.DataLib.Migrations
{
    public partial class bd_4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoardingPoints_BusRoutes_BusRouteId",
                table: "BoardingPoints");

            migrationBuilder.AlterColumn<int>(
                name: "BusRouteId",
                table: "BoardingPoints",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BoardingPoints_BusRoutes_BusRouteId",
                table: "BoardingPoints",
                column: "BusRouteId",
                principalTable: "BusRoutes",
                principalColumn: "BusRouteId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BoardingPoints_BusRoutes_BusRouteId",
                table: "BoardingPoints");

            migrationBuilder.AlterColumn<int>(
                name: "BusRouteId",
                table: "BoardingPoints",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_BoardingPoints_BusRoutes_BusRouteId",
                table: "BoardingPoints",
                column: "BusRouteId",
                principalTable: "BusRoutes",
                principalColumn: "BusRouteId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
