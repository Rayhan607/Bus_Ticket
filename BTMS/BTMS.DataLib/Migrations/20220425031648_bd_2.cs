using Microsoft.EntityFrameworkCore.Migrations;

namespace BTMS.DataLib.Migrations
{
    public partial class bd_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BoardingPoints",
                columns: table => new
                {
                    BoardingPointId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PointName = table.Column<string>(maxLength: 50, nullable: false),
                    Address = table.Column<string>(maxLength: 150, nullable: true),
                    BusRouteId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BoardingPoints", x => x.BoardingPointId);
                    table.ForeignKey(
                        name: "FK_BoardingPoints_BusRoutes_BusRouteId",
                        column: x => x.BusRouteId,
                        principalTable: "BusRoutes",
                        principalColumn: "BusRouteId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BoardingPoints_BusRouteId",
                table: "BoardingPoints",
                column: "BusRouteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BoardingPoints");
        }
    }
}
