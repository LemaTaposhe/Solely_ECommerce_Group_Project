using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Products;
using IsDB_R57_Solely.Entities.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Reflection.Emit;


namespace IsDB_R57_Solely.Data
{
    public static class SeedData
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Brand>().HasData(
                new Brand { BrandId = 1, Name = "Ikea", Description = "Swedish multinational company known for ready-to-assemble furniture, kitchen appliances, and home accessories.", isActive = true },
                new Brand { BrandId = 2, Name = "Ashley Furniture", Description = "American furniture store chain offering a wide range of home furniture and accessories.", isActive = true },
                new Brand { BrandId = 3, Name = "West Elm", Description = "Retailer specializing in modern furniture and home decor.", isActive = true },
                new Brand { BrandId = 4, Name = "Pottery Barn", Description = "Offers classic and stylish home furnishings and decor.", isActive = true },
                new Brand { BrandId = 5, Name = "Crate & Barrel", Description = "Provides a variety of furniture and home goods with a focus on modern design.", isActive = true },
                new Brand { BrandId = 6, Name = "Wayfair", Description = "Online retailer offering a vast selection of furniture, home decor, and more.", isActive = true },
                new Brand { BrandId = 7, Name = "CB2", Description = "Contemporary furniture store known for modern and eclectic home decor.", isActive = true },
                new Brand { BrandId = 8, Name = "Ethan Allen", Description = "High-end furniture manufacturer and retailer with a focus on custom designs and classic styles.", isActive = true },
                new Brand { BrandId = 9, Name = "La-Z-Boy", Description = "Specializes in comfortable recliners, sofas, and home furnishings.", isActive = true },
                new Brand { BrandId = 10, Name = "Herman Miller", Description = "Designs and manufactures innovative furniture and office solutions.", isActive = true }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, Name = "Living Room", Description = "Furniture and decor for living rooms.", isActive = true },
                new Category { CategoryId = 2, Name = "Bedroom", Description = "Furniture and accessories for bedrooms.", isActive = true },
                new Category { CategoryId = 3, Name = "Dining Room", Description = "Furniture for dining areas, including tables and chairs.", isActive = true },
                new Category { CategoryId = 4, Name = "Office", Description = "Furniture and decor for home and office workspaces.", isActive = true },
                new Category { CategoryId = 5, Name = "Outdoor", Description = "Furniture and accessories for outdoor spaces.", isActive = true }
            );

            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, Name = "Ikea EKTORP Sofa", Description = "Comfortable and stylish sofa with deep cushions.", Price = 499.00m, NormalizedName = "IKEAEKTORP SOFA", ThumbnailImage = "http://localhost:5000/ProductImage/f1.jpg", BrandId = 1, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 2, Name = "Ashley Furniture Madison Recliner", Description = "Classic recliner chair with plush cushioning.", Price = 350.00m, NormalizedName = "ASHLEY FURNITURE MADISON RECLINER", ThumbnailImage = "http://localhost:5000/ProductImage/f2.jpg", BrandId = 2, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 3, Name = "West Elm Mid-Century Dining Table", Description = "Elegant dining table with a mid-century modern design.", Price = 750.00m, NormalizedName = "WEST ELM MID-CENTURY DINING TABLE", ThumbnailImage = "http://localhost:5000/ProductImage/f3.jpg", BrandId = 3, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 4, Name = "Pottery Barn Farmhouse Bed", Description = "Rustic bed with a classic farmhouse design.", Price = 950.00m, NormalizedName = "POTTERY BARN FARMHOUSE BED", ThumbnailImage = "http://localhost:5000/ProductImage/f4.jpg", BrandId = 4, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 5, Name = "Crate & Barrel Barrett Desk", Description = "Sleek and modern desk perfect for a home office.", Price = 400.00m, NormalizedName = "CRATE & BARREL BARRETT DESK", ThumbnailImage = "http://localhost:5000/ProductImage/f5.jpg", BrandId = 5, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 6, Name = "Ikea KALLAX Shelf", Description = "Versatile shelving unit for books and decor.", Price = 89.00m, NormalizedName = "IKEAKALLAX SHELF", ThumbnailImage = "http://localhost:5000/ProductImage/f6.jpg", BrandId = 1, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 7, Name = "Ashley Furniture L-shaped Sofa", Description = "Spacious and comfortable L-shaped sectional sofa.", Price = 999.00m, NormalizedName = "ASHLEY FURNITURE L-SHAPED SOFA", ThumbnailImage = "http://localhost:5000/ProductImage/f7.jpg", BrandId = 2, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 8, Name = "West Elm Leather Armchair", Description = "Elegant leather armchair with mid-century modern design.", Price = 550.00m, NormalizedName = "WEST ELM LEATHER ARMCHAIR", ThumbnailImage = "http://localhost:5000/ProductImage/f8.jpg", BrandId = 3, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 9, Name = "Pottery Barn Farmhouse Dining Table", Description = "Solid wood dining table with a rustic farmhouse design.", Price = 200.00m, NormalizedName = "POTTERY BARN FARMHOUSE DINING TABLE", ThumbnailImage = "http://localhost:5000/ProductImage/f9.jpg", BrandId = 4, isActive = true, CreatedOn = DateTime.Now },
                new Product { ProductId = 10, Name = "Crate & Barrel Sutton Coffee Table", Description = "Stylish coffee table with a sleek glass top and metal base.", Price = 320.00m, NormalizedName = "CRATE & BARREL SUTTON COFFEE TABLE", ThumbnailImage = "http://localhost:5000/ProductImage/f10.jpg", BrandId = 5, isActive = true, CreatedOn = DateTime.Now }
            );

            modelBuilder.Entity<Tag>().HasData(
                new Tag { TagId = 1, Name = "Modern", Description = "Contemporary furniture designs with clean lines and minimalistic approach.", isActive = true },
                new Tag { TagId = 2, Name = "Vintage", Description = "Classic furniture designs that reflect the styles of the past.", isActive = true },
                new Tag { TagId = 3, Name = "Eco-Friendly", Description = "Furniture made from sustainable or recycled materials.", isActive = true },
                new Tag { TagId = 4, Name = "Sale", Description = "Items currently on sale or discounted.", isActive = true },
                new Tag { TagId = 5, Name = "New Arrival", Description = "Recently added furniture items to the store.", isActive = true },
                new Tag { TagId = 6, Name = "Best Seller", Description = "Popular items that are best-selling among customers.", isActive = true },
                new Tag { TagId = 7, Name = "Luxury", Description = "High-end furniture with premium quality and design.", isActive = true },
                new Tag { TagId = 8, Name = "Compact", Description = "Furniture designed for small spaces and efficient use of space.", isActive = true },
                new Tag { TagId = 9, Name = "Ergonomic", Description = "Furniture designed for comfort and efficiency in workspace settings.", isActive = true },
                new Tag { TagId = 10, Name = "Custom", Description = "Furniture that can be customized to fit individual preferences and needs.", isActive = true }
            );

            modelBuilder.Entity<User>().HasData(
            new User { Id = 1, UserName = "user1@example.com", FirstName = "John", LastName = "Doe", isActive = true, CreatedOn = DateTime.UtcNow },
            new User { Id = 2, UserName = "user2@example.com", FirstName = "Jane", LastName = "Smith", isActive = false, CreatedOn = DateTime.UtcNow }
            );

            modelBuilder.Entity<IdentityRole<int>>().HasData(
            new IdentityRole<int> { Id = 1, Name = "Super Admin", NormalizedName = "SUPER ADMIN" },
            new IdentityRole<int> { Id = 2, Name = "Admin", NormalizedName = "ADMIN" },
            new IdentityRole<int> { Id = 3, Name = "Officer", NormalizedName = "OFFICER" },
            new IdentityRole<int> { Id = 4, Name = "Customer", NormalizedName = "CUSTOMER" }
            );

            modelBuilder.Entity<DeliveryMethod>().HasData(
            new DeliveryMethod
            {
                DeliveryMethodId = 1,
                ShortName = "RedX",
                Description = "Fastest delivery time",
                DeliveryTime = "1-2 Days",
                Price = 120.00M,
                isActive = true
            },
            new DeliveryMethod
            {
                DeliveryMethodId = 2,
                ShortName = "SA",
                Description = "Get it within 5 days",
                DeliveryTime = "2-5 Days",
                Price = 80.00M,
                isActive = true
            },
            new DeliveryMethod
            {
                DeliveryMethodId = 3,
                ShortName = "Shundarban",
                Description = "Slower but cheap",
                DeliveryTime = "5-7 Days",
                Price = 50.00M,
                isActive = true
            },
            new DeliveryMethod
            {
                DeliveryMethodId = 4,
                ShortName = "FREE",
                Description = "Free! You get what you pay for",
                DeliveryTime = "1-2 Month",
                Price = 0.00M,
                isActive = true
            }
            );
        }
    }
}
