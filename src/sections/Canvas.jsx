import React, { useRef, useState } from "react";
import { Stage, Layer, Line, Rect, Circle, Transformer } from "react-konva";

const PaintApp = () => {
  const [tool, setTool] = useState(null);
  const [color, setColor] = useState("black");
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      const pos = e.target.getStage().getPointerPosition();
      if (tool === "brush" || tool === "eraser") {
        isDrawing.current = true;
        setLines([...lines, { tool, points: [pos.x, pos.y], color }]);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;

    const pos = e.target.getStage().getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([pos.x, pos.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleTransformEnd = (index, newProps) => {
    const newShapes = shapes.slice();
    newShapes[index] = { ...newShapes[index], ...newProps };
    setShapes(newShapes);
  };

  const handleDelete = () => {
    const newShapes = shapes.filter((shape) => shape.id !== selectedId);
    setShapes(newShapes);
    setSelectedId(null);
  };

  const handleAddShape = (type) => {
    const pos = { x: 50, y: 50 };
    let newShape;
    if (type === "rect") {
      newShape = {
        id: `rect-${shapes.length + 1}`,
        type: "rect",
        x: pos.x,
        y: pos.y,
        width: 100,
        height: 100,
        fill: color,
        stroke: "black",
        strokeWidth: 2,
      };
    } else if (type === "circle") {
      newShape = {
        id: `circle-${shapes.length + 1}`,
        type: "circle",
        x: pos.x,
        y: pos.y,
        radius: 50,
        fill: color,
        stroke: "black",
        strokeWidth: 2,
      };
    } else if (type === "line") {
      newShape = {
        id: `line-${shapes.length + 1}`,
        type: "line",
        points: [pos.x, pos.y, pos.x + 100, pos.y],
        stroke: color,
        strokeWidth: 2,
      };
    }
    setShapes([...shapes, newShape]);
    setSelectedId(newShape.id);
    setTool("move");
  };

  const handleColorChange = (e) => {
    const newShapes = shapes.map(shape => {
      if (shape.id === selectedId) {
        return { ...shape, fill: e.target.value };
      }
      return shape;
    });
    setShapes(newShapes);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-800 p-4 z-10 flex space-x-2">
        <button
          onClick={() => setTool("brush")}
        >
          Brush
        </button>
        <button
          onClick={() => setTool("eraser")}
        >
          Eraser
        </button>
        <button
          onClick={() => handleAddShape("rect")}
        >
          Rectangle
        </button>
        <button
          onClick={() => handleAddShape("circle")}
        >
          Circle
        </button>
        <button
          onClick={() => handleAddShape("line")}
        >
          Line
        </button>
        <button
          onClick={handleDelete}
          disabled={!selectedId}
        >
          Delete
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            handleColorChange(e);
          }}
        />
      </div>
      <div className="mx-auto">
        <Stage
          width={600}
          height={850}
          className="border border-gray-600"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.tool === "eraser" ? "white" : line.color}
                strokeWidth={line.tool === "eraser" ? 20 : 2}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
            {shapes.map((shape, i) => (
              shape.type === "rect" ? (
                <RectangleShape
                  key={shape.id}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => handleSelect(shape.id)}
                  onChange={(newAttrs) => handleTransformEnd(i, newAttrs)}
                />
              ) : shape.type === "circle" ? (
                <CircleShape
                  key={shape.id}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => handleSelect(shape.id)}
                  onChange={(newAttrs) => handleTransformEnd(i, newAttrs)}
                />
              ) : (
                <LineShape
                  key={shape.id}
                  shapeProps={shape}
                  isSelected={shape.id === selectedId}
                  onSelect={() => handleSelect(shape.id)}
                  onChange={(newAttrs) => handleTransformEnd(i, newAttrs)}
                />
              )
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

const RectangleShape = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        {...shapeProps}
        ref={shapeRef}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY,
          });
        }}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  );
};

const CircleShape = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Circle
        {...shapeProps}
        ref={shapeRef}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);

          onChange({
            x: node.x(),
            y: node.y(),
            radius: node.radius() * Math.max(scaleX, scaleY),
          });
        }}
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  );
};

const LineShape = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Line
        {...shapeProps}
        ref={shapeRef}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const points = node.points();
          const newPoints = [points[0], points[1], points[2], points[3]];

          onChange({
            points: newPoints,
          });
        }}
        onDragEnd={(e) => {
          const node = shapeRef.current;
          const points = node.points();
          const newPoints = [points[0], points[1], points[2], points[3]];

          onChange({
            points: newPoints,
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  );
};

export default PaintApp;