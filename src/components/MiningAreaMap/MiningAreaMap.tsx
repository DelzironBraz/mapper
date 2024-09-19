import { useEffect, useRef } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import { Polygon } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke, Fill } from "ol/style";

const MiningAreaMap = ({ coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Converta as coordenadas para o formato esperado pelo OpenLayers
    const transformedCoordinates = coordinates.map((coord) =>
      fromLonLat([coord.lon, coord.lat])
    );

    // Cria a geometria do polígono com as coordenadas transformadas
    const polygon = new Polygon([transformedCoordinates]);

    // Cria a feature do polígono
    const feature = new Feature({
      geometry: polygon,
    });

    // Define o estilo do polígono (bordas e preenchimento)
    feature.setStyle(
      new Style({
        stroke: new Stroke({
          color: "blue", // Cor da borda
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)", // Cor de preenchimento com transparência
        }),
      })
    );

    // Fonte de dados vetoriais (contém as features)
    const vectorSource = new VectorSource({
      features: [feature],
    });

    // Camada vetorial para renderizar o polígono
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Cria o mapa
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(), // Camada base do OpenStreetMap
        }),
        vectorLayer, // Camada que contém o polígono
      ],
      view: new View({
        center: fromLonLat([coordinates[0].lon, coordinates[0].lat]), // Centraliza o mapa no primeiro ponto
        zoom: 12,
      }),
    });

    return () => map.setTarget(null); // Limpa o mapa ao desmontar o componente
  }, [coordinates]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MiningAreaMap;
