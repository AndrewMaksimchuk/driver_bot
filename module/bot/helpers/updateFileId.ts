import type { IMessage } from "../bot_api_types.ts";
import type { IRoadMark, IRoadSign, TTableList } from "../databaseTables.ts";
import db from "../database.ts";

type TItem = IRoadSign | IRoadMark;

/** Update value of "file_id" column because this value is missing. */
export default (message: IMessage, item: TItem, table: TTableList) => {
  const photo = message.photo;

  if (photo) {
    const { file_id } = photo[0];

    file_id &&
      db.updateColumn({
        table: table,
        id: item.id,
        column: "file_id",
        value: file_id,
      });
  }
};
