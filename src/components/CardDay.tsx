import React from 'react';
import {DragOverlay, useDroppable, useDraggable} from '@dnd-kit/core';
import uuid from 'react-uuid';
// ui
import { Box } from '../ui';


export const DragTask = (props: any) => {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
  });
  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{}}
    >
      {props.children}
    </Box>
  )
}

const TaskComponent = ({ task, onDelete, onEdit }:{ task: any, onDelete?: (e: any) => void | any, onEdit?: () => void }) => {

  return (
      <Box
        width='80%'
        bg='#ffffff9c'
        display='flex'
        padding='4px 8px'
        borderRadius='10px'
        justifyContent='space-between'
      >
        <Box display='flex' flexDirection='column'>
          <Box display='flex' gridGap='4px'>
            {task.selectedColors.map(
              (color: any, i: number) => <Box
                key={i}
                width='20px'
                height='8px'
                bg={color}
                borderRadius='8px'/>
            )}
          </Box>
          <Box fontSize='12px' textAlign='start'>{task.text}</Box>
        </Box>
        <Box display='flex' gridGap='4px'>
          <Box width='10px' height='10px' onPointerDown={onEdit}>E</Box>
          <Box width='10px' height='10px' onPointerDown={onDelete}>D</Box>
        </Box>
      </Box>
  )
};

export const DroppableCardWrapper = React.memo((props: any) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props?.id,
    data: props.data
  });
  
  return (
    <Box
      ref={setNodeRef}
      transition='all 0.2s'
      borderColor={isOver ? 'green' : 'black'}
      transform={isOver ? 'scale(1.5)' : undefined}
      boxShadow={isOver ? '0 0 10px -4px' : undefined}
    >
      {props.children}
    </Box>
  )
})

export const CardDayComponent = ({
  id,
  data,
  activeId,
  dayTasks,
  tasksData,
  handleAddCard,
  handleEditCard,
  handleDeleteCard,
  isCurrentMonthDay,
}:{
  id?: any;
  data: any;
  dayTasks: any;
  activeId: any;
  tasksData: any;
  handleAddCard: (data: any) => void;
  isCurrentMonthDay: boolean;
  handleEditCard: (data: any) => void;
  handleDeleteCard: (data: any) => void;
}) => {

  return (
    <DroppableCardWrapper key={`dropped-${uuid()}`} id={`dropped-${id}`} data={data}>
      <Box
        key={`dropped-${id}`}
        bg='#d9d9d9'
        display='flex'
        height='100px'
        border='1px solid'
        borderRadius='4px'
        flexDirection='column'
        onClick={handleAddCard}
        opacity={isCurrentMonthDay ? '1' : '0.5'}
      >
        <Box
          padding='4px'
          fontSize='12px'
          color='lightblack'
          width='max-content'
        >
          {data.dayNum}
        </Box>
          {
            dayTasks
            ? dayTasks.map((task: any, i: number) => (
              <Box>
                <DragTask key={i+1} id={task.id}>
                  <TaskComponent
                    key={i}
                    task={task}
                    onEdit={() => handleEditCard(task)}
                    onDelete={(e: any) => {
                      // e.stopPropagation();
                      handleDeleteCard(task);
                      return;
                    }}
                    />
                </DragTask>
                <DragOverlay>
                {
                  activeId
                  ? (
                    <TaskComponent task={tasksData[activeId]}/>
                  )
                  : null
                }
              </DragOverlay>
              </Box>
            ))
            : null
          }
      </Box>
    </DroppableCardWrapper>
  );
}

export default CardDayComponent;
