using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OLX_clone.DataAccessLayer.Models;

namespace OLX_clone.DataAccessLayer.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasData(
            // Main categories
            new Category { Id = 1, Title = "Електроніка", SKU = "electronics" },
            new Category { Id = 2, Title = "Одяг та взуття", SKU = "clothes_and_shoes" },
            new Category { Id = 3, Title = "Нерухомість", SKU = "real_estate" },
            new Category { Id = 4, Title = "Тварини", SKU = "animals" },
            new Category { Id = 5, Title = "Дитячий світ", SKU = "childrens_world" },

            // Subcategories for Electronics
            new Category { Id = 6, Title = "Смартфони", SKU = "smartphones", ParentId = 1 },
            new Category { Id = 7, Title = "Комп'ютери та комплектуючі", SKU = "computers_and_components", ParentId = 1 },
            new Category { Id = 8, Title = "Ноутбуки", SKU = "laptops", ParentId = 1 },
            new Category { Id = 9, Title = "Фототехніка", SKU = "photography", ParentId = 1 },
            new Category { Id = 10, Title = "Аудіотехніка", SKU = "audio", ParentId = 1 },
            new Category { Id = 11, Title = "Тв", SKU = "tv", ParentId = 1 },
            new Category { Id = 12, Title = "Ігрові приставки", SKU = "game_consoles", ParentId = 1 },
            new Category { Id = 13, Title = "Кліматичне обладнання", SKU = "climate_equipment", ParentId = 1 },
            new Category { Id = 14, Title = "Техніка для кухні", SKU = "kitchen_appliances", ParentId = 1 },
            new Category { Id = 15, Title = "Інша техніка", SKU = "other_electronics", ParentId = 1 },

            // Subcategories for Fashion
            new Category { Id = 16, Title = "Чоловічий одяг", SKU = "men_clothing", ParentId = 2 },
            new Category { Id = 17, Title = "Жіночий одяг", SKU = "women_clothing", ParentId = 2 },
            
            // Subcategories for Real estate
            new Category { Id = 18, Title = "Квартири", SKU = "apartments", ParentId = 3 },
            new Category { Id = 19, Title = "Будинки", SKU = "houses", ParentId = 3 },
            new Category { Id = 20, Title = "Земля", SKU = "ground", ParentId = 3 },
            new Category { Id = 21, Title = "Комерційна нерухомість", SKU = "commercial_real_estate", ParentId = 3 },
                
            // Subcategories for Animals
            new Category { Id = 22, Title = "Собаки", SKU = "dogs", ParentId = 4 },
            new Category { Id = 23, Title = "Коти", SKU = "cats", ParentId = 4 },
            new Category { Id = 24, Title = "Птахи", SKU = "birds", ParentId = 4 },
            new Category { Id = 25, Title = "Акваріум", SKU = "aquarium", ParentId = 4 },
            new Category { Id = 26, Title = "Гризуни", SKU = "rodents", ParentId = 4 },
            new Category { Id = 27, Title = "Сільськогосподарські тварини", SKU = "farm_animals", ParentId = 4 },
            new Category { Id = 28, Title = "Зоотовари", SKU = "pet_supplies", ParentId = 4 },
            new Category { Id = 29, Title = "В'язка", SKU = "breeding", ParentId = 4 },
            new Category { Id = 30, Title = "Інші тварини", SKU = "other_animals", ParentId = 4 },
            
            new Category { Id = 31, Title = "Дитячий одяг", SKU = "children_clothing", ParentId = 5 },
            new Category { Id = 32, Title = "Дитяче взуття", SKU = "children_shoes", ParentId = 5 },
            new Category { Id = 33, Title = "Дитячі меблі", SKU = "children_furniture", ParentId = 5 },
            new Category { Id = 34, Title = "Дитячий транспорт", SKU = "children_transport", ParentId = 5 },
            new Category { Id = 35, Title = "Іграшки", SKU = "toys", ParentId = 5 },
            new Category { Id = 36, Title = "Товари для школярів", SKU = "school_supplies", ParentId = 5 },
            new Category { Id = 37, Title = "Інші дитячі товари", SKU = "other_children_goods", ParentId = 5 }
        );
    }
}