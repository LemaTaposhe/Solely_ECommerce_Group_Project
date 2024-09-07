using IsDB_R57_Solely.DAL.ViewModel;
using IsDB_R57_Solely.Entities.Cart;
using IsDB_R57_Solely.Entities.Inventory;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Payments;
using IsDB_R57_Solely.Entities.Products;
using IsDB_R57_Solely.Entities.Users;
using IsDB_R57_Solely.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.Data
{
    public class SolelyDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public SolelyDbContext(DbContextOptions<SolelyDbContext> options) : base(options)
        {

        }
        #region DbSet

        #region Cart
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        //public DbSet<WishList> WishLists { get; set; }
        //public DbSet<WishListItem> WishListItems { get; set; }
        #endregion

        #region Inventory
        public DbSet<Requisition> Requisitions { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        //public DbSet<Warehouse> Warehouses { get; set; }
        #endregion
        #region Order
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderAddress> OrderAddresses { get; set; }
       // public DbSet<OrderHistory> OrderHistories { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Return> Returns { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        #endregion
        #region Payment
        //public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Payment> Payments { get; set; }
        //public DbSet<PaymentProvider> PaymentProviders { get; set; }
        #endregion
        #region Products
        public DbSet<Product> Products { get; set; }
        //public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductPriceHistory> ProductPriceHistories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }
        //public DbSet<ProductAttribute> ProductAttributes { get; set; }
        #endregion
        #region Users
        public DbSet<Address> Addresses { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<Division> Divisions { get; set; }
        //public DbSet<UserAddress> UserAddresses { get; set; }
        #endregion

        #endregion

        #region modelBuilder

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        
            //requisition relation
            modelBuilder.Entity<Requisition>().HasOne(s => s.Supplier).WithMany().HasForeignKey(s => s.SupplierId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Requisition>().HasOne(p => p.Product).WithMany().HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict);


            //Inspection relation
            modelBuilder.Entity<Inspection>().HasOne(r => r.Requisition).WithMany().HasForeignKey(p => p.RequistionId).OnDelete(DeleteBehavior.Restrict);


            //Stock relation
            modelBuilder.Entity<Purchase>().HasOne(s => s.Supplier).WithMany().HasForeignKey(s => s.SupplierId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Purchase>().HasOne(p => p.Product).WithMany().HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict);

            //return relation
            modelBuilder.Entity<Return>().HasOne(i => i.Invoice).WithMany().HasForeignKey(i => i.InvoiceId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Return>().HasOne(o => o.Order).WithMany().HasForeignKey(o => o.OrderId).OnDelete(DeleteBehavior.Restrict);

            //Invoice relation
            modelBuilder.Entity<Invoice>().HasOne(o => o.Order).WithMany().HasForeignKey(o => o.OrderId).OnDelete(DeleteBehavior.Restrict);



            //orderdetail relation
            //modelBuilder.Entity<OrderDetail>().HasOne(o => o.Order).WithMany(o => o.OrderDetail).HasForeignKey(o => o.OrderId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Purchase>().HasOne(p => p.Product).WithMany().HasForeignKey(p => p.ProductId).OnDelete(DeleteBehavior.Restrict);





            modelBuilder.Entity<OrderItem>().Property(i => i.ProductPrice).HasColumnType("decimal(18,2)");


            modelBuilder.Entity<Order>().OwnsOne(o => o.ShippingAddress, a =>
            {
                a.WithOwner();

            });


            modelBuilder.Entity<Order>().Property(s => s.Status)
                .HasConversion(o => o.ToString(), o => (OrderStatus)Enum.Parse(typeof(OrderStatus), o));

            modelBuilder.Entity<Order>().HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<DeliveryMethod>().Property(d => d.Price).HasColumnType("decimal(18,2)");


            //identity
            modelBuilder.Entity<User>().HasOne(a => a.Address).WithOne(a => a.User).HasForeignKey<Address>(a => a.UserId);

            //category and sub category


            modelBuilder.Entity<Cart>()
                 .HasMany(c => c.Items)
                 .WithOne(b => b.Cart)
                 .HasForeignKey(b => b.CartId)
                 .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<IdentityUser>()
            .HasIndex(u => u.Email)
            .IsUnique();

            #region SeedData
            modelBuilder.Seed();
            #endregion
        }
        #endregion
    }
}
