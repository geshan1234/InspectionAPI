using InspectionApi.Data;
using InspectionApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InspectionApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : Controller
    {
        private readonly DataContext _context;

        public StatusController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Status>>> GetStatusList()
        {
            return Ok(await _context.Status.ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Status>> CreateStatus(Status data)
        {
            var existingStatus = await _context.Status.FindAsync(data.Id);

            if (existingStatus != null)
            {
                return BadRequest();
            }

            await _context.Status.AddAsync(data);
            await _context.SaveChangesAsync();
            return Ok(await _context.Status.FindAsync(data.Id));
        }

        [HttpPut]
        public async Task<ActionResult<Status>> UpdateStatus(Status data)
        {
            var existingStatus = await _context.Status.FindAsync(data.Id);

            if (existingStatus == null)
            {
                return NotFound();
            }

            existingStatus.Id = data.Id;
            existingStatus.StatusOption = data.StatusOption;

            await _context.SaveChangesAsync();

            return Ok(await _context.Status.FindAsync(data.Id));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Status>>> DeleteStatus(int id)
        {
            var existingStatus = await _context.Status.FindAsync(id);

            if (existingStatus == null)
            {
                return NotFound();
            }

            _context.Status.Remove(existingStatus);
            await _context.SaveChangesAsync();

            return Ok(await _context.Status.ToListAsync());
        }
    }
}
