using IsDB_R57_Solely.DAL.SpecificQuery;

namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);    

        Task<TEntity> Get(int id);
        Task<IReadOnlyList<TEntity>> List();

        Task<TEntity> GetEntityWithSpec(ISpecification<TEntity> spec);
        Task<IReadOnlyList<TEntity>> List(ISpecification<TEntity> spec);
        Task<int> Count(ISpecification<TEntity> spec);


    }
}
