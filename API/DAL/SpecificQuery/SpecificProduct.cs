using IsDB_R57_Solely.DAL.SpecificQuery;
using IsDB_R57_Solely.Entities.Products;
using Microsoft.IdentityModel.Tokens;
using System.Linq.Expressions;

namespace IsDB_R57_Solely.DAL.SpecificQuery
{

    public class SpecificProduct : BaseSpecification<Product>
    {
        public SpecificProduct(ProductSpecParams productParams)
            : base(BuildCriteria(productParams))
        {
            AddInclude(x => x.Brand);
            AddInclude(x => x.Category);
            AddInclude(x => x.Tag);

            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                ApplySorting(productParams.Sort);
            }
            else
            {
                ApplyDefaultSorting();
            }
        }

        public SpecificProduct(int id) : base(x => x.ProductId == id)
        {
            AddInclude(x => x.Brand);
            AddInclude(x => x.Category);
            AddInclude(x => x.Tag);
        }

        private static Expression<Func<Product, bool>> BuildCriteria(ProductSpecParams productParams)
        {
            return x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.BrandId.HasValue || x.BrandId == productParams.BrandId) &&
                (!productParams.CategoryId.HasValue || x.CategoryId == productParams.CategoryId) &&
                (!productParams.TagId.HasValue || x.TagId == productParams.TagId);
        }

        private void ApplySorting(string sort)
        {
            switch (sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                case "priceDesc":
                    AddOrderByDesc(x => x.Price);
                    break;
                default:
                    AddOrderBy(x => x.Name);
                    break;
            }
        }

        private void ApplyDefaultSorting()
        {
            AddOrderBy(x => x.Name); // Default sorting by name
        }
    }
}








