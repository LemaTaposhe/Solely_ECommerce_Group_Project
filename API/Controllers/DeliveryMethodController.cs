//using IsDB_R57_Solely.DAL.Interfaces;
//using IsDB_R57_Solely.Data;
//using IsDB_R57_Solely.Entities.Orders;
//using IsDB_R57_Solely.Entities.Products;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace IsDB_R57_Solely.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DeliveryMethodController : ControllerBase
//    {
//        public SolelyDbContext db;
//        public DeliveryMethodController(SolelyDbContext context)
//        {
//            db = context;
//        }
//        [HttpGet]
//        public IQueryable<DeliveryMethod> Get()
//        {
//            return db.DeliveryMethods;
//        }

//        [HttpGet]
//        public Task<ActionResult> Get(int dmId)
//        {
//            DeliveryMethod dm = new DeliveryMethod();
//            dm = db.DeliveryMethods.Find(dmId);
//            if (dm == null)
//            {
//                return NotFound();
//            }
//            return Ok(dm);
//        }

//        [HttpPost]
//        public IHttpActionResult AddStudent(Student student)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }
//            db.Students.Add(student);
//            db.SaveChanges();
//            return Ok(student);
//        }

//        [HttpPut]
//        [Route("Edit/{studentId}")]
//        public IHttpActionResult EditStudent(Student student)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }
//            Student stu = new Student();
//            stu = db.Students.Find(student.StudentId);
//            if (stu != null)
//            {
//                stu.Name = student.Name;
//                stu.Address = student.Address;
//                stu.DOB = student.DOB;
//                stu.Email = student.Email;
//                stu.CellPhone = student.CellPhone;
//            }
//            db.SaveChanges();
//            return Ok(student);
//        }

//        [HttpDelete]
//        [Route("Delete/{studentId}")]
//        public IHttpActionResult DeleteStudent(int StudentId)
//        {
//            Student student = db.Students.Find(StudentId);
//            if (student == null)
//            {
//                return NotFound();
//            }
//            db.Students.Remove(student);
//            db.SaveChanges();
//            return Ok(student);
//        }
//    }
//}
