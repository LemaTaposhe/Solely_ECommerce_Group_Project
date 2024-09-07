using IsDB_R57_Solely.DAL.Interfaces;
using IsDB_R57_Solely.Data;
using IsDB_R57_Solely.Entities.Orders;
using IsDB_R57_Solely.Entities.Payments;
using Microsoft.EntityFrameworkCore;

namespace IsDB_R57_Solely.DAL.Repositories
{
    //public class CouponRepository
    //{
    //    private readonly SolelyDbContext _context;

    //    public CouponRepository(SolelyDbContext context)
    //    {
    //        _context = context;
    //    }

    //    public async Task<IEnumerable<Coupon>> Get()
    //    {
    //        return await _context.Coupons.ToListAsync();
    //    }

    //    public async Task<Coupon> Get(int id)
    //    {
    //        return await _context.Coupons.FindAsync(id);
    //    }

    //    public async Task<object> Post(Coupon entity)
    //    {
    //        _context.Coupons.Add(entity);
    //        await _context.SaveChangesAsync();
    //        return entity;
    //    }

    //    public async Task<object> Put(int id, Coupon entity)
    //    {
    //        var existingCoupon = await _context.Coupons.FindAsync(id);
    //        if (existingCoupon == null)
    //        {
    //            return null;
    //        }

    //        _context.Entry(existingCoupon).CurrentValues.SetValues(entity);
    //        await _context.SaveChangesAsync();
    //        return entity;
    //    }

    //    public async Task<object> Delete(int id)
    //    {
    //        var coupon = await _context.Coupons.FindAsync(id);
    //        if (coupon == null)
    //        {
    //            return null;
    //        }

    //        _context.Coupons.Remove(coupon);
    //        await _context.SaveChangesAsync();
    //        return coupon;
    //    }
    //}
}
