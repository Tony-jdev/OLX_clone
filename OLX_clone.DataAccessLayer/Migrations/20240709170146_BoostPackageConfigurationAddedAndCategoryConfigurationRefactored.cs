using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OLX_clone.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class BoostPackageConfigurationAddedAndCategoryConfigurationRefactored : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "BoostPackages",
                columns: new[] { "Id", "BoostCount", "Name", "NumberOfDays", "Price", "TopDurationInDays", "Type", "VipDurationInDays" },
                values: new object[,]
                {
                    { 1, 0, "Легкий старт", 1, 21.0, 3, "Top", 0 },
                    { 2, 3, "Швидкий продаж", 1, 33.0, 7, "Top", 0 },
                    { 3, 9, "Турбо продаж", 1, 109.0, 30, "Vip", 7 }
                });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "Title",
                value: "Електроніка");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "SKU", "Title" },
                values: new object[] { "clothes_and_shoes", "Одяг та взуття" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Нерухомість");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "Title",
                value: "Тварини");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "Title",
                value: "Дитячий світ");

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "ParentId", "SKU", "Title" },
                values: new object[,]
                {
                    { 6, 1, "smartphones", "Смартфони" },
                    { 7, 1, "computers_and_components", "Комп'ютери та комплектуючі" },
                    { 8, 1, "laptops", "Ноутбуки" },
                    { 9, 1, "photography", "Фототехніка" },
                    { 10, 1, "audio", "Аудіотехніка" },
                    { 11, 1, "tv", "Тв" },
                    { 12, 1, "game_consoles", "Ігрові приставки" },
                    { 13, 1, "climate_equipment", "Кліматичне обладнання" },
                    { 14, 1, "kitchen_appliances", "Техніка для кухні" },
                    { 15, 1, "other_electronics", "Інша техніка" },
                    { 16, 2, "men_clothing", "Чоловічий одяг" },
                    { 17, 2, "women_clothing", "Жіночий одяг" },
                    { 18, 3, "apartments", "Квартири" },
                    { 19, 3, "houses", "Будинки" },
                    { 20, 3, "ground", "Земля" },
                    { 21, 3, "commercial_real_estate", "Комерційна нерухомість" },
                    { 22, 4, "dogs", "Собаки" },
                    { 23, 4, "cats", "Коти" },
                    { 24, 4, "birds", "Птахи" },
                    { 25, 4, "aquarium", "Акваріум" },
                    { 26, 4, "rodents", "Гризуни" },
                    { 27, 4, "farm_animals", "Сільськогосподарські тварини" },
                    { 28, 4, "pet_supplies", "Зоотовари" },
                    { 29, 4, "breeding", "В'язка" },
                    { 30, 4, "other_animals", "Інші тварини" },
                    { 31, 5, "children_clothing", "Дитячий одяг" },
                    { 32, 5, "children_shoes", "Дитяче взуття" },
                    { 33, 5, "children_furniture", "Дитячі меблі" },
                    { 34, 5, "children_transport", "Дитячий транспорт" },
                    { 35, 5, "toys", "Іграшки" },
                    { 36, 5, "school_supplies", "Товари для школярів" },
                    { 37, 5, "other_children_goods", "Інші дитячі товари" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "BoostPackages",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "BoostPackages",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "BoostPackages",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "Title",
                value: "Electronics");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "SKU", "Title" },
                values: new object[] { "fashion", "Fashion" });

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "Title",
                value: "Real estate");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "Title",
                value: "Animals");

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "Title",
                value: "Children's world");
        }
    }
}
