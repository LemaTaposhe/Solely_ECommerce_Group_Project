namespace IsDB_R57_Solely.DAL.ViewModel
{
    public class ProductOrdered
    {
        public ProductOrdered()
        {
        }

        public ProductOrdered(int productId, string productName, string thumbnailImage)
        {
            ProductId = productId;
            ProductName = productName;
            ThumbnailImage = thumbnailImage;
        }

        public int ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? ThumbnailImage { get; set; }
    }
}
