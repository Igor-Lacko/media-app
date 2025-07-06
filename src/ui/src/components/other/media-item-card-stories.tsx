import React from "react";
import MediaItemCard from "./media-item-card";

export default {
    title: "Components/MediaItemCard",
    component: MediaItemCard,
};

const mockModel = {
    title: "Example Movie",
    thumbnailUrl: "/example-thumbnail.jpg",
};

export const Default = () => (
    <MediaItemCard model={mockModel} extraClassNames="w-64 h-96" />
);

export const NoThumbnail = () => (
    <MediaItemCard model={{ ...mockModel, thumbnailUrl: "" }} extraClassNames="w-64 h-96" />
);