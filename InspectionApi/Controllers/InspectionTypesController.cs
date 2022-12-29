using InspectionApi.Data;
using InspectionApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InspectionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InspectionTypesController : Controller
    {
        private readonly DataContext _context;
        public InspectionTypesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<InspectionType>>> GetInspectionTypes ()
        {
            return Ok(await _context.InspectionTypes.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<InspectionType>> CreateInspectionType (InspectionType data)
        {
            await _context.InspectionTypes.AddAsync(data);
            await _context.SaveChangesAsync();
            return Ok(data);
        }

        [HttpPut]
        public async Task<ActionResult<List<InspectionType>>> UpdateInspectionType (InspectionType data)
        {
            var existingInspectionType = await _context.InspectionTypes.FindAsync(data.id);

            if (existingInspectionType == null)
            {
                return NotFound();
            }

            existingInspectionType.id = data.id;
            existingInspectionType.InspectionName = data.InspectionName;

            await _context.SaveChangesAsync();
            return Ok(await _context.InspectionTypes.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<InspectionType>>> DeleteInspectionType (int id)
        {
            var exexistingInspectionTypeist = await _context.InspectionTypes.FindAsync(id);
            if (exexistingInspectionTypeist == null)
            {
                return NotFound(id);
            }

            _context.InspectionTypes.Remove(exexistingInspectionTypeist);
            await _context.SaveChangesAsync();
            return (await _context.InspectionTypes.ToListAsync());
        }
    }
}
