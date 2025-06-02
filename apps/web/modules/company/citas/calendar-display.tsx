"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, X } from 'lucide-react';

// Tipos
interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: string;
  color: string;
}

type ViewType = 'day' | 'week' | 'month' | 'year';

// Datos de ejemplo
const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Desayuno',
    startTime: '06:00',
    endTime: '07:00',
    date: '2025-06-04',
    color: 'chart1'
  },
  {
    id: '2',
    title: 'Vuelo a París',
    startTime: '07:30',
    endTime: '10:00',
    date: '2025-06-04',
    color: 'chart2'
  },
  {
    id: '3',
    title: 'Reunión con equipo de diseño',
    startTime: '10:00',
    endTime: '12:00',
    date: '2025-06-07',
    color: 'chart3'
  }
];

const colorClasses = {
  chart1: {
    bg: 'bg-[var(--color-chart-1)]/10 hover:bg-[var(--color-chart-1)]/20',
    text: 'text-[var(--color-chart-1)]',
    textLight: 'text-[var(--color-chart-1)]/70 group-hover:text-[var(--color-chart-1)]'
  },
  chart2: {
    bg: 'bg-[var(--color-chart-2)]/10 hover:bg-[var(--color-chart-2)]/20',
    text: 'text-[var(--color-chart-2)]',
    textLight: 'text-[var(--color-chart-2)]/70 group-hover:text-[var(--color-chart-2)]'
  },
  chart3: {
    bg: 'bg-[var(--color-chart-3)]/10 hover:bg-[var(--color-chart-3)]/20',
    text: 'text-[var(--color-chart-3)]',
    textLight: 'text-[var(--color-chart-3)]/70 group-hover:text-[var(--color-chart-3)]'
  },
  chart4: {
    bg: 'bg-[var(--color-chart-4)]/10 hover:bg-[var(--color-chart-4)]/20',
    text: 'text-[var(--color-chart-4)]',
    textLight: 'text-[var(--color-chart-4)]/70 group-hover:text-[var(--color-chart-4)]'
  },
  chart5: {
    bg: 'bg-[var(--color-chart-5)]/10 hover:bg-[var(--color-chart-5)]/20',
    text: 'text-[var(--color-chart-5)]',
    textLight: 'text-[var(--color-chart-5)]/70 group-hover:text-[var(--color-chart-5)]'
  }
};

export function CalendarDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<ViewType>('week');
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    color: 'chart1' as keyof typeof colorClasses
  });

  const container = useRef<HTMLDivElement>(null);
  const containerNav = useRef<HTMLDivElement>(null);
  const containerOffset = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Establecer la posición de scroll basada en la hora actual
    const currentMinute = new Date().getHours() * 60 + new Date().getMinutes();
    if (container.current && containerNav.current && containerOffset.current) {
      const totalHeight = container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight;
      container.current.scrollTop = (totalHeight * currentMinute) / 1440;
    }
  }, []);

  // Funciones de navegación
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    switch (currentView) {
      case 'day':
        newDate.setDate(newDate.getDate() - 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() - 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    switch (currentView) {
      case 'day':
        newDate.setDate(newDate.getDate() + 1);
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obtener días de la semana actual
  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Lunes como primer día
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentDate);
  const today = new Date();
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  // Formatear fecha para el encabezado
  const formatHeaderDate = () => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return currentDate.toLocaleDateString('es-ES', options);
  };

  // Agregar evento
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.startTime && newEvent.endTime) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        date: newEvent.date,
        color: newEvent.color
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', date: '', startTime: '', endTime: '', color: 'blue' });
      setShowEventModal(false);
    }
  };

  // Obtener eventos para una fecha específica
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  // Convertir tiempo a posición en grid
  const timeToGridRow = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return Math.floor((hours * 60 + minutes) / 5) + 2; // +2 para offset
  };

  // Calcular duración en filas de grid
  const getEventDuration = (startTime: string, endTime: string) => {
    const start = timeToGridRow(startTime);
    const end = timeToGridRow(endTime);
    return Math.max(1, end - start);
  };

  // Generar horas del día
  const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour12 = i === 0 ? 12 : i > 12 ? i - 12 : i;
      const ampm = i < 12 ? 'AM' : 'PM';
      hours.push(`${hour12}${ampm}`);
    }
    return hours;
  };

  return (
    <div className="flex h-screen flex-col">
      {/* Encabezado */}
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <h1 className="text-base font-semibold text-foreground capitalize">
          <time>{formatHeaderDate()}</time>
        </h1>
        
        <div className="flex items-center gap-4">
          {/* Controles de navegación */}
          <div className="flex items-center rounded-md bg-white shadow-sm border border-gray-300">
            <button
              onClick={navigatePrevious}
              className="flex h-9 w-12 items-center justify-center rounded-l-md text-gray-400 hover:text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToToday}
              className="hidden md:block border-x border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Hoy
            </button>
            <button
              onClick={navigateNext}
              className="flex h-9 w-12 items-center justify-center rounded-r-md text-gray-400 hover:text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Selector de vista - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setShowViewMenu(!showViewMenu)}
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
              >
                Vista {currentView}
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showViewMenu && (
                <div className="absolute right-0 z-10 mt-2 w-36 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                  <div className="py-1">
                    {(['day', 'week', 'month', 'year'] as ViewType[]).map((view) => (
                      <button
                        key={view}
                        onClick={() => {
                          setCurrentView(view);
                          setShowViewMenu(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 capitalize"
                      >
                        Vista {view}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowEventModal(true)}
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Agregar evento
            </button>
          </div>

          {/* Menú móvil */}
          <div className="relative md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="rounded-full p-2 text-gray-400 hover:text-gray-500"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>

            {showMobileMenu && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowEventModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Crear evento
                  </button>
                  <button
                    onClick={() => {
                      goToToday();
                      setShowMobileMenu(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Ir a hoy
                  </button>
                </div>
                <div className="border-t border-gray-100 py-1">
                  {(['day', 'week', 'month', 'year'] as ViewType[]).map((view) => (
                    <button
                      key={view}
                      onClick={() => {
                        setCurrentView(view);
                        setShowMobileMenu(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 capitalize"
                    >
                      Vista {view}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Contenido del calendario */}
      <div ref={container} className="flex flex-auto flex-col overflow-auto bg-white">
        <div className="flex max-w-full flex-none flex-col">
          {/* Encabezado de días - Mobile */}
          <div className="sticky top-0 z-30 flex-none bg-white shadow-sm ring-1 ring-black/5 sm:hidden">
            <div className="grid grid-cols-7 text-sm text-gray-500">
              {weekDays.map((day, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center pt-2 pb-3"
                >
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                  <span className={`mt-1 flex h-8 w-8 items-center justify-center font-semibold ${
                    isToday(day) 
                      ? 'rounded-full bg-indigo-600 text-white' 
                      : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Encabezado de días - Desktop */}
          <div
            ref={containerNav}
            className="sticky top-0 z-30 flex-none bg-white shadow-sm ring-1 ring-black/5 hidden sm:block"
          >
            <div className="grid grid-cols-8 divide-x divide-gray-100 border-r border-gray-100 text-sm text-gray-500">
              <div className="w-14" />
              {weekDays.map((day, index) => (
                <div key={index} className="flex items-center justify-center py-3">
                  <span className="flex items-baseline">
                    {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'][index]}
                    <span className={`ml-1.5 flex h-8 w-8 items-center justify-center font-semibold ${
                      isToday(day)
                        ? 'rounded-full bg-indigo-600 text-white'
                        : 'text-gray-900'
                    }`}>
                      {day.getDate()}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Grid principal */}
          <div className="flex flex-auto">
            <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Líneas horizontales con horas */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7" />
                {generateHours().map((hour, index) => (
                  <React.Fragment key={index}>
                    <div>
                      <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs text-gray-400">
                        {hour}
                      </div>
                    </div>
                    <div />
                  </React.Fragment>
                ))}
              </div>

              {/* Líneas verticales */}
              <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid">
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className={`col-start-${index + 1} row-span-full ${index === 7 ? 'w-8' : ''}`} />
                ))}
              </div>

              {/* Eventos */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7"
                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
              >
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = getEventsForDate(day);
                  return dayEvents.map((event) => {
                    const startRow = timeToGridRow(event.startTime);
                    const duration = getEventDuration(event.startTime, event.endTime);
                    const colors = colorClasses[event.color as keyof typeof colorClasses];
                    
                    return (
                      <li
                        key={event.id}
                        className={`relative mt-px flex ${dayIndex === 0 ? '' : `sm:col-start-${dayIndex + 1}`}`}
                        style={{ gridRow: `${startRow} / span ${duration}` }}
                      >
                        <div className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg ${colors.bg} p-2 text-xs cursor-pointer`}>
                          <p className={`order-1 font-semibold ${colors.text}`}>{event.title}</p>
                          <p className={colors.textLight}>
                            <time>{event.startTime}</time>
                          </p>
                        </div>
                      </li>
                    );
                  });
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar evento */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowEventModal(false)} />
            
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    Agregar nuevo evento
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Título</label>
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Título del evento"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Hora inicio</label>
                        <input
                          type="time"
                          value={newEvent.startTime}
                          onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Hora fin</label>
                        <input
                          type="time"
                          value={newEvent.endTime}
                          onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Color</label>
                      <select
                        value={newEvent.color}
                        onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value as keyof typeof colorClasses })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="blue">Azul</option>
                        <option value="pink">Rosa</option>
                        <option value="gray">Gris</option>
                        <option value="green">Verde</option>
                        <option value="yellow">Amarillo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleAddEvent}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Agregar
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}