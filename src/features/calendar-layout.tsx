import React, { useState, useEffect, useReducer, useContext, useRef, useMemo } from 'react';
import moment from 'moment';
import html2canvas from 'html2canvas';
import {DndContext} from '@dnd-kit/core';
import uuid from 'react-uuid';
import { Box } from '../ui';
// components
import {
  DayNames,
  DayNumbers,
  ExportImport,
  GridWrapper
} from '../components/default-components';
import CardDayComponent, { DragTask, DroppableCardWrapper } from '../components/CardDay';
import CountryMenu from '../components/contryMenu';
import PrevNextComponent from '../components/prevNextComp';

// hooks
import { requestFunc } from '../hooks/useRequest';
import { ModalContext } from '../contexts/modalContext';
import { CreateCardComponent } from '../components/CreateCard';

///////////////////////////////////////////////////////////////////////////////////////////////////


function removeElementFromArray(array: Array<any>, element: any) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

const NAGER_DATE_API = 'https://date.nager.at/api/v3';
const fetchData = async () => {
  const some = await requestFunc({
    method: 'GET',
    url: `${NAGER_DATE_API}/AvailableCountries`,
  })
  return some;
};

const generateListDate = (date: any) => {
  let list = [];
  let nextDate = moment(date);
  for(let listDate = 0; listDate < 42; listDate++) {
    list.push({
      dayNum: nextDate.date(),
      date: nextDate.valueOf(),
      monthNum: nextDate.month(),
      weekMin: nextDate.format('WWW'),
      monthMin: nextDate.format('MMM'),
      day: nextDate.format('DD/MM/YYYY HH:mm')
    });
    nextDate = nextDate.add(1, 'day');
  }
  return list;
}

const useGenerateDateList = (date?: string) => {
  const startDateMonth = moment(date, 'x').startOf('M');
  const startCalendarDate = startDateMonth.days() === 0
    ? startDateMonth
    : startDateMonth.subtract(startDateMonth.day(), 'days');
  const list = generateListDate(startCalendarDate);
  return list;
}

const changeMonthReducer = (state: any, action: any) => {
  const actionsObj: any = {
    'NEXT_MONTH': () => {
      const date =  moment(state?.date, 'x').add(1, 'M').valueOf();
      return {
        ...state,
        date,
      };
    },
    'PREV_MONTH': () => {
      const date = moment(state?.date, 'x').subtract(1, 'M').valueOf();
      return {
        ...state,
        date
      };
    },
    'ADD_CARD': () => {
      const id = uuid();
      return {
        ...state,
        tasks: {
          ...state?.tasks,
          [id]: { ...action?.data, id }
        }
      }
    },
    'EDIT_CARD': () => {
      const id = action?.data?.id;
      return {
        ...state,
        tasks: {
          ...state?.tasks,
          [id]: action?.data
        }
      }
    },
    'DELETE_CARD': () => {
      const id = action?.data?.id;
      const newStateTasks = {...state.tasks};
      delete newStateTasks[id];
      return {
        ...state,
        tasks: newStateTasks
      }
    },
    'UPLOAD_TASKS': () => {
      const newStateTasks = {...state.tasks};
      return {
        ...state,
        tasks: {...newStateTasks, ...action?.data}
      }
    },
  };

  return actionsObj[action.type]();
};

const groupedData = (list: Array<any>, groupProp: string) => {
  const someObj: any = {};
  list.forEach((el) => {
    const keyObj: any = el[groupProp];
    if (Object.hasOwn(someObj, keyObj)) {
      return someObj[keyObj] = [...someObj[keyObj], el];
    }
    return someObj[keyObj] = [el];
  });
  return someObj;
}

const CalendarLayout = () => {
  const [countriesData, setCountries] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const calendarRef: any = useRef(null);
  const { setOpen, setModalData }: any = useContext(ModalContext);
  const createRef = useRef(null);
  const [state, dispatch] = useReducer(changeMonthReducer, {
    tasks: {},
    date: moment().valueOf(),
  });

  const datesList = useGenerateDateList(state?.date);

  const downloadCalendarImage = () => {
    html2canvas(calendarRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = 'calendar.png';
      link.click();
    });
  };

  const handleUploadTask = (data: any) => {
    dispatch({
      data,
      type: 'UPLOAD_TASKS',
    })
  }

  const handleNextMonth = () => {
    dispatch({
      type: 'NEXT_MONTH'
    })
  }

  const handlePrevMonth = () => {
    dispatch({
      type: 'PREV_MONTH'
    })
  }

  const handleAddCard = (dayData: any) => {
    setOpen(true)
    setModalData({
      component: <CreateCardComponent ref={createRef} onSubmit={(data) => dispatch({
        data: { ...data, ...dayData},
        type: 'ADD_CARD'
      })} />,
    })

    return;
  }

  const handleEditCard = (data: any) => {
    dispatch({
      data,
      type: 'EDIT_CARD'
    })
  }

  const handleDeleteCard = (data: any) => {
    console.log('handleDeleteCard-data: ', data);

    dispatch({
      data,
      type: 'DELETE_CARD'
    })
  }

  useEffect(() => {
    fetchData().then((data: any) => {
      setCountries(data);
      return data;
    });
  }, [])

  const groupedTasks = useMemo(() => groupedData(Object.values(state?.tasks), 'date'), [state]);
  return (
    <Box padding='20px' ref={calendarRef}>
      <ExportImport downloadData={state?.tasks} uploadTasks={handleUploadTask} />
      <Box onClick={downloadCalendarImage}>Download Calendar</Box>
      <CountryMenu countries={countriesData}/>
      <PrevNextComponent handleNext={handleNextMonth} handlePrev={handlePrevMonth}/>
      <Box>{moment(state?.date).format('MMMM YYYY')}</Box>
      <DayNames/>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <GridWrapper>
          {
            datesList.map((el, i) => {
              return (
              <CardDayComponent
                id={i}
                key={i}
                data={el}
                activeId={activeId}
                tasksData={state?.tasks}
                dayTasks={groupedTasks[el?.date]}
                handleAddCard={() => handleAddCard(el)}
                handleEditCard={() => handleEditCard(el)}
                handleDeleteCard={() => handleDeleteCard(el)}
                isCurrentMonthDay={el.monthNum === moment(state?.date).month()} />
              );
            })
          }
        </GridWrapper>
      </DndContext>
      <DayNumbers/>
    </Box>
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }
  
  function handleDragEnd(event: any) {
    const dragedTaskId = event?.active?.id;
    const newTaskDate = event?.over?.data?.current?.date;
    const taskData = Object.hasOwn(state.tasks, dragedTaskId) ? state.tasks[dragedTaskId] : {};

    if (event?.over) {
      dispatch({
        type: 'EDIT_CARD',
        data: {
          ...taskData,
          date: newTaskDate
        }
      })
    }
    setActiveId(null);
  }
};

export default CalendarLayout;
