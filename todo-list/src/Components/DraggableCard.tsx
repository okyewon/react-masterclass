import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableCardProps {
  toDo: string;
  idx: number;
}

const DraggableCard = React.memo(({ toDo, idx }: IDraggableCardProps) => {
  return (
    <Draggable key={toDo} draggableId={toDo} index={idx}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
});

export default DraggableCard;
