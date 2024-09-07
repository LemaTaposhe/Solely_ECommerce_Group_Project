using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Data;
using Microsoft.EntityFrameworkCore;
using IsDB_R57_Solely.Entities.Users;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class DistrictRepository /*: IDistrictRepository*/
    {

        public readonly SolelyDbContext _context;
        public DistrictRepository(SolelyDbContext context)
        {
            _context = context;
        }
        public async Task<object> Delete(int id)
        {
            var district = await _context.Districts.FindAsync(id);
            if (district != null)
            {
                _context.Districts.Remove(district);
                await _context.SaveChangesAsync();
            }
            return district;
        }

        public async Task<IEnumerable<District>> Get()
        {
            return await _context.Set<District>().ToListAsync();
        }

        //public async Task<Brand> Get(int id)
        //{
        //    return await _context.Set<Brand>().FirstAsync();
        //}

        public async Task<District> Get(int id)
        {
            var district = await _context.Districts.FindAsync(id);
            return district;
        }

        public async Task<object> Post(District entity)
        {

            _context.Districts.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Put(int id, District entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }
        public async Task<bool> CheckDuplicate(string name, int divisionId)
        {
            return await _context.Districts
                .AnyAsync(d => d.Name == name && d.DivisionId == divisionId);
        }
    }
}
