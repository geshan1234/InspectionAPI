using InspectionApi.Data;
using InspectionApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InspectionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InspectionsController : Controller
    {
        private readonly DataContext _context;
        public InspectionsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Inspection>>> GetInspectionList ()
        {
            return Ok(await _context.Inspections.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Inspection>> CreateInspection (Inspection data)
        {
            await _context.Inspections.AddAsync(data);
            await _context.SaveChangesAsync();

            return Ok(await _context.Inspections.FindAsync(data.Id));
        }

        [HttpPut]
        public async Task<ActionResult<List<Inspection>>> UpdateInspection(Inspection data)
        {
            var existingInspection = await _context.Inspections.FindAsync(data.Id);
            if (existingInspection == null)
            {
                return NotFound();
            }

            existingInspection.Id = data.Id;
            existingInspection.Status = data.Status;
            existingInspection.Comments = data.Comments;
            existingInspection.InspectionTypeId = data.InspectionTypeId;

            await _context.SaveChangesAsync();

            return Ok(await _context.Inspections.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Inspection>>> DeleteInspection(int id)
        {
            var existingInspectionslist = await _context.Inspections.FindAsync(id);
            if (existingInspectionslist == null)
            {
                return NotFound(id);
            }

            _context.Inspections.Remove(existingInspectionslist);
            await _context.SaveChangesAsync();
            return (await _context.Inspections.ToListAsync());
        }

    }
}
