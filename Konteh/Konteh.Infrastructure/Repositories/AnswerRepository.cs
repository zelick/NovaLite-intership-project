using Konteh.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Konteh.Infrastructure.Repositories 
{
    public class AnswerRepository : BaseRepository<Answer>
    {
        private DbSet<Answer> _answers;
        public AnswerRepository(KontehDbContext context) : base(context)
        {
            _answers = context.Answers;
        }
        
    }
}
