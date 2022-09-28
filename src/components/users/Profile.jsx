import { useNavigate, useParams } from "react-router-dom";
import { getUser, parseJwt } from "../../web-services";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate(-1);
  } else {
    let payload = parseJwt(token)
    if(payload.roles.includes("CSR")) {
        let request = getUser(id)
    } else {
        let request = getUser("")
    }
  }

  return <div></div>;
}
