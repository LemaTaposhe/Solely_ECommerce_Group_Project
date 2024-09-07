using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    public class DivisionRepository /*:IDivisionRepository*/
    {
        private readonly SolelyDbContext _context;

        public DivisionRepository(SolelyDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Division>> Get()
        {
            return await _context.Divisions.ToListAsync();
        }

        public async Task<Division> Get(int id)
        {
            return await _context.Divisions.FindAsync(id);
        }

        public async Task<object> Post(Division entity)
        {
            _context.Divisions.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Put(int id, Division entity)
        {
            var existingDivision = await _context.Divisions.FindAsync(id);
            if (existingDivision == null)
            {
                return null;
            }

            _context.Entry(existingDivision).CurrentValues.SetValues(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<object> Delete(int id)
        {
            var division = await _context.Divisions.FindAsync(id);
            if (division == null)
            {
                return null;
            }

            _context.Divisions.Remove(division);
            await _context.SaveChangesAsync();
            return division;
        }
    }
}
