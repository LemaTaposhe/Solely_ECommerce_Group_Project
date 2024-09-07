namespace IsDB_R57_Solely.DAL.Interfaces
{
    public interface IUnitOfWork:IDisposable
    {
        IGenericRepository<T> Repository<T>() where T : class;
        Task<int> Complete();
    }
}
