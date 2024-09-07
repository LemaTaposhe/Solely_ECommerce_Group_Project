using IsDB_R57_Solely.DAL.SpecificQuery;

namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IReadOnlyList<TEntity>> Get();
        Task<TEntity> Get(int id);
        Task<object> Post(TEntity entity);
        Task<object> Put(int id, TEntity entity);
        Task<object> Delete(int id);


        Task<TEntity> GetEntityWithSpec(ISpecification<TEntity> specification);
        Task<IReadOnlyList<TEntity>> List(ISpecification<TEntity> specification);
        Task<int> Count(ISpecification<TEntity> specification);

    }
}
