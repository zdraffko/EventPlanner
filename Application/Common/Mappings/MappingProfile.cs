using Application.Common.Models.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, UserDto>();

            CreateMap<Event, EventDto>()
                .ForMember(d => d.Attendees,
                    options
                        => options.MapFrom(source => source.UserEvents));

            CreateMap<UserEvent, AttendeeDto>()
                .ForMember(d => d.Username,
                    options
                        => options.MapFrom(source => source.AppUser.UserName));
        }
    }
}
