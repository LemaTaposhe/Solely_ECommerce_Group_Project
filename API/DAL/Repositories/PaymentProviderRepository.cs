//using IsDB_R57_Solely.DAL.Interfaces;
//using IsDB_R57_Solely.Data;
//using IsDB_R57_Solely.Entities.Orders;
//using IsDB_R57_Solely.Entities.Payments;
//using Microsoft.EntityFrameworkCore;

//namespace IsDB_R57_Solely.DAL.Repositories
//{
//    public class PaymentProviderRepository:IPaymentProviderRepository
//    {
//        private readonly SolelyDbContext _context;

//        public PaymentProviderRepository(SolelyDbContext context)
//        {
//            _context = context;
//        }

//        public async Task<IEnumerable<PaymentProvider>> Get()
//        {
//            return await _context.PaymentProviders.ToListAsync();
//        }

//        public async Task<PaymentProvider> Get(int id)
//        {
//            return await _context.PaymentProviders.FindAsync(id);
//        }

//        public async Task<object> Post(PaymentProvider entity)
//        {
//            _context.PaymentProviders.Add(entity);
//            await _context.SaveChangesAsync();
//            return entity;
//        }

//        public async Task<object> Put(int id, PaymentProvider entity)
//        {
//            var existingPaymentProvider = await _context.PaymentProviders.FindAsync(id);
//            if (existingPaymentProvider == null)
//            {
//                return null;
//            }

//            _context.Entry(existingPaymentProvider).CurrentValues.SetValues(entity);
//            await _context.SaveChangesAsync();
//            return entity;
//        }

//        public async Task<object> Delete(int id)
//        {
//            var paymentProvider = await _context.PaymentProviders.FindAsync(id);
//            if (paymentProvider == null)
//            {
//                return null;
//            }

//            _context.PaymentProviders.Remove(paymentProvider);
//            await _context.SaveChangesAsync();
//            return paymentProvider;
//        }
//    }
//}
