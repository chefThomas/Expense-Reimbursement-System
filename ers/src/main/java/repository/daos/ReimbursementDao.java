package repository.daos;

import java.util.List;

import repository.models.Reimbursement;
import repository.models.User;

public interface ReimbursementDao {

    Reimbursement add(Reimbursement u);

    List<Reimbursement> getAll();

    List<Reimbursement> getAllByEmp(User u);

    Reimbursement get(Reimbursement i);

    Reimbursement approve(int reId, int manId);

    Reimbursement deny(int reId, int manId);

    int remove(Reimbursement i);
}
