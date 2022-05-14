using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BTMS.DataLib.Models;
using BTMS.Data.ViewModels.Input;
using BTMS.Data.ViewModels.Edit;

namespace BTMS.Data.Controllers.Data
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusRoutesController : ControllerBase
    {
        private readonly BusDbContext _context;

        public BusRoutesController(BusDbContext context)
        {
            _context = context;
        }

        // GET: api/BusRoutes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusRoute>>> GetBusRoutes()
        {
            return await _context.BusRoutes.ToListAsync();
        }
        /*
         * Custom to get route with boarding points
         * *********************************************
         * */
        [HttpGet("WithPoints")]
        public async Task<ActionResult<IEnumerable<BusRoute>>> GetBusRoutesWithPoints()
        {
            return await _context.BusRoutes.Include(x=> x.BoardingPoints).ToListAsync();
        }
        // GET: api/BusRoutes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BusRoute>> GetBusRoute(int id)
        {
            var busRoute = await _context.BusRoutes.FindAsync(id);

            if (busRoute == null)
            {
                return NotFound();
            }

            return busRoute;
        }
        /*
         * Custom to get a single route with boarding points
         * *********************************************
         * */
        [HttpGet("{id}/WithPoints")]
        public async Task<ActionResult<BusRoute>> GetBusRouteWithPoints(int id)
        {
            var busRoute = await _context.BusRoutes.Include(x=> x.BoardingPoints).FirstOrDefaultAsync(x=> x.BusRouteId  == id);

            if (busRoute == null)
            {
                return NotFound();
            }

            return busRoute;
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBusRoute(int id, BusRoute busRoute)
        {
            if (id != busRoute.BusRouteId)
            {
                return BadRequest();
            }

            _context.Entry(busRoute).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusRouteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        /*
         * Custom to update a single route with boarding points
         * *********************************************
         * */
        [HttpPut("{id}/WithPoints")]
        public async Task<IActionResult> PutBusRouteWithPoints(int id, BusRouteEditModel model)
        {

            if (id != model.BusRouteId)
            {
                return BadRequest();
            }
            var busRoute = await _context.BusRoutes.Include(x=> x.BoardingPoints).FirstOrDefaultAsync(x => x.BusRouteId == id);
            if(busRoute == null)
            {
                return NotFound();
            }
            
            busRoute.From = model.From;
            busRoute.To = model.To;
            
            foreach (var b in model.BoardingPoints)
            {
                var existing = busRoute.BoardingPoints.FirstOrDefault(x=> x.BoardingPointId == b.BoardingPointId);
                if(existing == null)
                {
                    busRoute.BoardingPoints.Add(new BoardingPoint { PointName = b.PointName, Address = b.Address });
                }
                else
                {
                    existing.PointName = b.PointName;
                    existing.Address = b.Address;
                   // _context.Entry(existing).State = EntityState.Modified;  
                    
                }
                
            }
            List<int> toDelete = new List<int>();
            foreach(var point in busRoute.BoardingPoints)
            {
                var isDeleted = model.BoardingPoints.FirstOrDefault(x => x.BoardingPointId == point.BoardingPointId);
                if(isDeleted == null)
                {
                    toDelete.Add(point.BoardingPointId);
                }
            }
            if (toDelete.Count > 0) await this.DeleteBoradingPointsAsync(toDelete);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BusRouteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BusRoutes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BusRoute>> PostBusRoute(BusRoute busRoute)
        {
            _context.BusRoutes.Add(busRoute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusRoute", new { id = busRoute.BusRouteId }, busRoute);
        }
        /*
         * Custom to insert route with boarding points
         * *********************************************
         * */
        [HttpPost("WithPoints")]
        public async Task<ActionResult<BusRoute>> PostBusRouteWithPoints(BusRouteInputModel model)
        {
            var busRoute = new BusRoute { From = model.From, To = model.To };
            foreach(var p in model.BoardingPoints)
            {
                busRoute.BoardingPoints.Add(new BoardingPoint { PointName = p.PointName, Address = p.Address });
            }
            _context.BusRoutes.Add(busRoute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBusRoute", new { id = busRoute.BusRouteId }, busRoute);
        }
        // DELETE: api/BusRoutes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BusRoute>> DeleteBusRoute(int id)
        {
            var busRoute = await _context.BusRoutes.FindAsync(id);
            if (busRoute == null)
            {
                return NotFound();
            }

            _context.BusRoutes.Remove(busRoute);
            await _context.SaveChangesAsync();

            return busRoute;
        }
        /*
         * Custom to get boarding points for autocomplete
         * *********************************************
         * */
        // GET: api/BusRoutes/Points
        [HttpGet("Points")]
        public async Task<ActionResult<IEnumerable<string>>> GetBoardingPointOptions()
        {
            return await _context.BoardingPoints
                .Select(b => b.PointName)
                .Distinct()
                .OrderBy(x => x)
                .ToListAsync();

        }
        private bool BusRouteExists(int id)
        {
            return _context.BusRoutes.Any(e => e.BusRouteId == id);
        }
        //helper methods
        private async Task DeleteBoradingPointsAsync(IEnumerable<int> ids)
        {
            foreach(var i in ids)
            {
                var b = _context.BoardingPoints.FirstOrDefault(x => x.BoardingPointId == i);
                _context.BoardingPoints.Remove(b);
            }
                       
            await _context.SaveChangesAsync();
        }
    }
}
