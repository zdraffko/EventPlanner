﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(EventPlannerDbContext))]
    partial class EventPlannerDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.Entities.Event", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Venue")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Events");

                    b.HasData(
                        new
                        {
                            Id = new Guid("0dc5a563-3e97-439f-a76c-85236c286c63"),
                            Category = "Tech",
                            City = "Sofia",
                            Date = new DateTime(2020, 2, 23, 12, 22, 41, 342, DateTimeKind.Local).AddTicks(9914),
                            Description = "This Event was 1 month ago",
                            Title = "Past Event 1",
                            Venue = "Sofia Tech Park"
                        },
                        new
                        {
                            Id = new Guid("f1818f53-e294-4075-8c3a-d0f8313439a3"),
                            Category = "Tech",
                            City = "Plovdiv",
                            Date = new DateTime(2020, 1, 23, 12, 22, 41, 345, DateTimeKind.Local).AddTicks(5233),
                            Description = "This Event was 2 months ago",
                            Title = "Past Event 2",
                            Venue = "Mall Plovdiv"
                        },
                        new
                        {
                            Id = new Guid("c0f13fa6-c746-410e-a570-8534e178e88f"),
                            Category = "Sports",
                            City = "Sofia",
                            Date = new DateTime(2020, 4, 23, 12, 22, 41, 345, DateTimeKind.Local).AddTicks(5315),
                            Description = "This Event is 1 month in the future",
                            Title = "Future Event 1",
                            Venue = "Armeets Arena"
                        },
                        new
                        {
                            Id = new Guid("b1265fcf-3494-41df-8faf-f2afcd3958fa"),
                            Category = "Music",
                            City = "Sofia",
                            Date = new DateTime(2020, 5, 23, 12, 22, 41, 345, DateTimeKind.Local).AddTicks(5322),
                            Description = "This Event is 2 months in the future",
                            Title = "Future Event 2",
                            Venue = "Armeets Arena"
                        },
                        new
                        {
                            Id = new Guid("923ddec3-2b27-4481-a4ef-6bfeb90d6520"),
                            Category = "Charity",
                            City = "Plovdiv",
                            Date = new DateTime(2020, 6, 23, 12, 22, 41, 345, DateTimeKind.Local).AddTicks(5325),
                            Description = "This Event is 3 months in the future",
                            Title = "Future Event 3",
                            Venue = "Glavnata"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
