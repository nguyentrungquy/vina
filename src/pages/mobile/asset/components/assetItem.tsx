export interface IAssetItemProps {
  code: string;
  name: string;
  onClick: () => void;
  active: boolean;
}

export default function AssetItem(props: IAssetItemProps) {
  return (
    <div
      onClick={props.onClick}
      className="flex h-10 items-center justify-between rounded-lg bg-white px-2 shadow shadow-gray-400"
    >
      <div className="flex items-center justify-center gap-2">
        <div
          className="pr-2 font-medium text-gray-600"
          style={{ borderRight: "1px solid #ccc" }}
        >
          {props.code}
        </div>
        <div className="line-clamp-1 text-sm text-gray-500">{props.name}</div>
      </div>
    </div>
  );
}
