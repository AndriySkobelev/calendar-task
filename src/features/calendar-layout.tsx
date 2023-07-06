import React, { useState, useEffect, useReducer, useContext, useRef, useMemo } from 'react';
import moment from 'moment';
import {DndContext} from '@dnd-kit/core';
import uuid from 'react-uuid';
import { Box } from '../ui';
// components
import {
  DayNames,
  DayNumbers,
  GridWrapper
} from '../components/default-components';
import { CreateCardComponent } from '../components/CreateCard';
import ExportImport from '../components/ExportImportComp';
import CardDayComponent from '../components/CardDay';
import CountryMenu from '../components/contryMenu';
import PrevNextComponent from '../components/prevNextComp';
// hooks
import { requestFunc } from '../hooks/useRequest';
import { ModalContext } from '../contexts/modalContext';
///////////////////////////////////////////////////////////////////////////////////////////////////

const NAGER_DATE_API = 'https://date.nager.at/api/v3';
const fetchData = async () => {
  const res: any = await requestFunc({
    method: 'GET',
    url: `${NAGER_DATE_API}/AvailableCountries`,
  })
  return res?.data;
};

/// HELPERS ///
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function removeElementFromArray(array: Array<any>, element: any) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
  return array;
}

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
/// HELPERS ///

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
      if (action?.callBack) {
        action?.callBack();
      }
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
      if (action?.callBack) {
        action?.callBack();
      }
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
        type: 'ADD_CARD',
        callBack: () => setOpen(false)
      })} />,
    })

    return;
  }

  const handleEditCard = (initialData: any) => {
    setOpen(true)
    setModalData({
      component: <CreateCardComponent
        ref={createRef}
        initialData={initialData}
        onSubmit={(data) => dispatch({
          data,
          type: 'EDIT_CARD',
          callBack: () => setOpen(false)
        })} />,
    })
  }

  const handleDeleteCard = (data: any) => {
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
      <CountryMenu countries={countriesData}/>
      <Box margin='0 0 30px 0' display='flex' justifyContent='space-between'>
        <PrevNextComponent handleNext={handleNextMonth} handlePrev={handlePrevMonth}/>
        <Box>{moment(state?.date).format('MMMM YYYY')}</Box>
        <ExportImport
        calendarRef={calendarRef}
        downloadData={state?.tasks}
        uploadTasks={handleUploadTask} />
      </Box>
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
                handleEditCard={handleEditCard}
                handleDeleteCard={handleDeleteCard}
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
