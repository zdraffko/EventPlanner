using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void SeedData(this ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Event>()
                .HasData(
                    new Event
                    {
                        Id = Guid.NewGuid(),
                        Title = "Past Event 1",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "This Event was 1 month ago",
                        Category = "Tech",
                        City = "Sofia",
                        Venue = "Sofia Tech Park",
                    },
                    new Event
                    {
                        Id = Guid.NewGuid(),
                        Title = "Past Event 2",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "This Event was 2 months ago",
                        Category = "Tech",
                        City = "Plovdiv",
                        Venue = "Mall Plovdiv",
                    },
                    new Event
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Event 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "This Event is 1 month in the future",
                        Category = "Sports",
                        City = "Sofia",
                        Venue = "Armeets Arena",
                    },
                    new Event
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Event 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "This Event is 2 months in the future",
                        Category = "Music",
                        City = "Sofia",
                        Venue = "Armeets Arena",
                    },
                    new Event
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Event 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "This Event is 3 months in the future",
                        Category = "Charity",
                        City = "Plovdiv",
                        Venue = "Glavnata",
                    });
        }
    }
}
