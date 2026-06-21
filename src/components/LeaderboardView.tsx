import React, { useState, useMemo } from "react";
import { StudentRank, CampusRank } from "../types";
import { Trophy, Search, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowDownRight, Award, Flame, Bike, Bus } from "lucide-react";

interface LeaderboardProps {
  students: StudentRank[];
  campuses: CampusRank[];
  userPoints: number;
}

export default function LeaderboardView({ students, campuses, userPoints }: LeaderboardProps) {
  const [activeFilter, setActiveFilter] = useState("Monthly");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Adjust student points relative to the user's real-time state points
  const adjustedStudents = useMemo(() => {
    return students.map(st => {
      if (st.isCurrentUser) {
        return { ...st, points: userPoints };
      }
      return st;
    }).sort((a, b) => b.points - a.points); // re-rank based on scores!
  }, [students, userPoints]);

  const filteredStudents = useMemo(() => {
    let result = [...adjustedStudents];
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        st => st.name.toLowerCase().includes(query) || st.campus.toLowerCase().includes(query)
      );
    }
    return result;
  }, [adjustedStudents, searchQuery]);

  // Paginated students
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const displayedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  const topThree = useMemo(() => {
    // Find absolute highest ranks for the top-podium representation
    const sorted = [...adjustedStudents].sort((a, b) => b.points - a.points);
    return {
      first: sorted[0] || null,
      second: sorted[1] || null,
      third: sorted[2] || null
    };
  }, [adjustedStudents]);

  return (
    <div className="flex flex-col gap-8 text-slate-800">
      {/* Header and Filter control */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="text-left">
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-800">
            Campus Leaderboard
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Competitive landscape for Indian eco-tech colleges.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/40">
          {["Weekly", "Monthly", "All Time"].map((filter) => (
            <button
               key={filter}
               onClick={() => {
                 setActiveFilter(filter);
                 setCurrentPage(1);
               }}
               className={`px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                 activeFilter === filter
                   ? "bg-white text-emerald-700 shadow-sm"
                   : "text-slate-500 hover:text-slate-800"
               }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Top Campus Banner */}
      <section className="clay-card rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-200/50 bg-white">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold text-[10px] tracking-wider uppercase mb-4 shadow-[inset_1px_1.5px_3px_white]">
              Leading Institution
            </span>
            <h3 className="font-headline text-3xl font-black text-slate-800 mb-2">IIT Bombay</h3>
            <p className="text-emerald-700 text-sm font-bold flex items-center justify-center md:justify-start gap-1.5 leading-none">
              <ArrowDownRight className="w-4 h-4 text-emerald-500" />
              <span>4,250 kg CO2e reduced this month</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center mx-auto mb-2 text-lg font-black text-slate-600 shadow-[inset_1px_1.5px_3px_white]">
                #2
              </div>
              <span className="text-xs font-bold text-slate-500">NIT Trichy</span>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center mx-auto mb-2 text-lg font-black text-slate-600 shadow-[inset_1px_1.5px_3px_white]">
                #3
              </div>
              <span className="text-xs font-bold text-slate-500">BITS Pilani</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Students Podium */}
      {adjustedStudents.length >= 3 && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mt-4">
          
          {/* Second Rank Profile - Left */}
          {topThree.second && (
            <div className="clay-card rounded-2xl p-6 flex flex-col items-center text-center order-2 md:order-1 transform md:translate-y-6 border border-slate-200/40 bg-white relative">
              <div className="relative mb-4">
                <img 
                  alt={topThree.second.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-slate-200 shadow-sm"
                  src={topThree.second.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop"}
                />
                <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 bg-slate-300 text-slate-800 px-3 py-0.5 rounded-full font-black text-xs shadow-sm">
                  #2
                </span>
              </div>
              <h4 className="font-headline font-bold text-slate-800 text-base truncate w-full max-w-[140px]">
                {topThree.second.name}
              </h4>
              <p className="text-xs text-slate-400 font-bold mb-3">{topThree.second.campus}</p>
              
              <div className="flex gap-2 mb-4 text-emerald-600">
                <Bike className="w-4 h-4" title="Bike Rider" />
                <Award className="w-4 h-4" title="Steward Trophy" />
              </div>
              <p className="font-bold text-emerald-605 text-sm font-mono">{topThree.second.points} pts</p>
            </div>
          )}

          {/* First Rank Profile - Center (Golds) */}
          {topThree.first && (
            <div className="clay-card rounded-2xl p-8 flex flex-col items-center text-center order-1 md:order-2 border-emerald-250 bg-gradient-to-b from-amber-50/50 to-white relative shadow-md">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="inline-flex p-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-600 shadow-sm">
                  <Award className="w-5 h-5" />
                </span>
              </div>
              <div className="relative mb-4 mt-2">
                <img 
                  alt={topThree.first.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-md"
                  src={topThree.first.avatarUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"}
                />
                <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 bg-amber-400 text-amber-950 px-3.5 py-0.5 rounded-full font-black text-xs shadow-md">
                  #1
                </span>
              </div>
              <h4 className="font-headline font-black text-slate-800 text-lg truncate w-full max-w-[160px]">
                {topThree.first.name}
              </h4>
              <p className="text-xs text-slate-400 font-bold mb-3">{topThree.first.campus}</p>

              <div className="flex gap-2 mb-4 text-emerald-700">
                <Award className="w-4 h-4 text-amber-500" />
                <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <p className="font-black text-emerald-700 text-lg font-mono">{topThree.first.points} pts</p>
            </div>
          )}

          {/* Third Rank Profile - Right */}
          {topThree.third && (
            <div className="clay-card rounded-2xl p-6 flex flex-col items-center text-center order-3 transform md:translate-y-8 border border-slate-200/40 bg-white relative">
              <div className="relative mb-4">
                <img 
                  alt={topThree.third.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-amber-700 shadow-sm"
                  src={topThree.third.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"}
                />
                <span className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 bg-amber-700 text-white px-2.5 py-0.5 rounded-full font-black text-xs shadow-sm">
                  #3
                </span>
              </div>
              <h4 className="font-headline font-bold text-slate-800 text-sm truncate w-full max-w-[130px]">
                {topThree.third.name}
              </h4>
              <p className="text-xs text-slate-400 font-bold mb-3">{topThree.third.campus}</p>

              <div className="flex gap-2 mb-4 text-emerald-600">
                <Bus className="w-4 h-4" />
              </div>
              <p className="font-bold text-emerald-605 text-xs font-mono">{topThree.third.points} pts</p>
            </div>
          )}
        </section>
      )}

      {/* Database Interactive Table */}
      <section className="clay-card rounded-2xl overflow-hidden mt-8 flex flex-col bg-white border border-slate-200/40">
        {/* Table Filters controls */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4.5 h-4.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-450" />
            <input 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-450 font-medium"
              placeholder="Search student or college..."
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto self-end">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
              <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
              <span>Full Parameters</span>
            </button>
          </div>
        </div>

        {/* Real Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f8fafc]/80 border-b border-slate-100">
              <tr>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-450 uppercase tracking-widest text-left">Rank Position</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-450 uppercase tracking-widest text-left">Student Steward</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-450 uppercase tracking-widest text-left">College Campus</th>
                <th className="py-4 px-6 text-[10px] font-bold text-slate-450 uppercase tracking-widest text-left">Eco Impact Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium">
              {displayedStudents.map((st) => {
                const isUser = st.isCurrentUser;
                // find ranking position dynamically based on adjusted list
                const dynamicRank = adjustedStudents.findIndex(x => x.id === st.id) + 1;
                return (
                  <tr 
                    key={st.id}
                    className={`transition-colors duration-200 ${
                      isUser 
                        ? "bg-emerald-50/50 border-l-4 border-l-emerald-500 font-semibold" 
                        : "hover:bg-slate-50/50 text-slate-700"
                    }`}
                  >
                    <td className={`py-4 px-6 font-mono font-bold text-left ${isUser ? "text-emerald-700" : "text-slate-500"}`}>
                      #{dynamicRank}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 justify-start">
                        {st.avatarUrl ? (
                          <img 
                            alt={st.name} 
                            className="w-8 h-8 rounded-full object-cover border border-slate-100 shadow-sm"
                            src={st.avatarUrl}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-500">
                            {st.initials}
                          </div>
                        )}
                        <span className={`text-sm ${isUser ? "text-emerald-800 font-black" : "text-slate-800"}`}>
                          {st.name} {isUser && "(You)"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 text-xs text-left">
                      {st.campus}
                    </td>
                    <td className={`py-4 px-6 font-mono text-left ${isUser ? "text-emerald-700 font-bold" : "text-slate-600"}`}>
                      {st.points} pts
                    </td>
                  </tr>
                );
              })}

              {displayedStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 text-sm">
                    No student stewards or campuses matched your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination element */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-500 bg-slate-50/50">
            <span>
              Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(filteredStudents.length, currentPage * itemsPerPage)} of {filteredStudents.length} entries
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
