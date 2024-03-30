import { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

const containerClass = css`
    margin: 60px auto 0px auto;
    padding: 10px;
    width: 450px;
    border-radius: 10px;
    background-color: #cdeae9;
    box-shadow: -5px -5px 10px 0px rgba(0, 0, 0, 0.3), 5px 5px 10px 0px rgba(0, 0, 0, 0.3);
    display: grid;
    grid-template-areas:
        'Label Label'
        'Deer  .'
        'Deer  Status'
        'Deer  .';
    grid-template-rows: 30px 80px 33.133px 110px;
    grid-template-columns: 150px 300px;
`;

const labelClass = css`
    grid-area: Label;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 30px;
`;

const deerClass = css`
    grid-area: Deer;
    width: 100%;
    height: 223.133px;
`;

const statusClass = css`
    grid-area: Status;
    width: 100%;
    height: 25px;
`;

const messageClass = css`
    font-size: 1.25rem;
    height: 25px;
`;

const Authentication: FC<{ message: string }> = (props: { message: string }) => {
    return (
        <div className={containerClass}>
            <div className={labelClass}>
                <img src="https://debtbot.yukiosada.work/key.svg" alt="key" />
                <p>DebtBot</p>
            </div>
            <div className={deerClass}>
                <img src="https://debtbot.yukiosada.work/deer.svg" alt="deer" />
            </div>
            <div className={statusClass}>
                <h1 className={messageClass}>{props.message}</h1>
            </div>
        </div>
    );
};

export default Authentication;
